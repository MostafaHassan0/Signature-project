
const jobTitleInput = document.getElementById('jobtitle');
const frenchJobTitleInput = document.getElementById('frenchJobTitle');
const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');


const displayName = document.getElementById('displayName');
const displayJobTitle = document.getElementById('displayJobTitle');
const displayFrenchJobTitle = document.getElementById('displayFrenchJobTitle');
const displayEmail = document.getElementById('displayEmail');

const extCheckbox = document.getElementById('toggleCheckbox');
const displayNumber = document.getElementById('displayNumber');
const extInput = document.getElementById('ext');
const displayExt = document.getElementById('displayExt');
const extNumber = document.getElementById('extNumber');

const fontSelected= document.getElementById('fontSelect')



// Debounce function to limit API calls
function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

async function translateToFrench(text) {
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`
        );
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Return original text if translation fails
    }
}

const updateFrenchTranslation = debounce(async () => {
    if (jobTitleInput.value.trim()) {
        const translatedText = await translateToFrench(jobTitleInput.value);
        frenchJobTitleInput.value = translatedText;
        displayFrenchJobTitle.textContent = translatedText;
    } else {
        frenchJobTitleInput.value = '';
        displayFrenchJobTitle.textContent = '';
    }
});

jobTitleInput.addEventListener('input', () => {
    updateFrenchTranslation();
    displayJobTitle.textContent = jobTitleInput.value;
});

frenchJobTitleInput.addEventListener('input', () => {
    displayFrenchJobTitle.textContent = frenchJobTitleInput.value;
});

fullNameInput.addEventListener('input', () => {
    displayName.textContent = fullNameInput.value;
});

emailInput.addEventListener('input', () => {
    displayEmail.textContent = emailInput.value;
});

extCheckbox.addEventListener('change', () => {
    if (extCheckbox.checked) {
        extInput.disabled = false; // Enable input
        displayNumber.style.display = 'inline'; // Show extension text
    } else {
        extInput.disabled = true; // Disable input
        displayNumber.style.display = 'none'; // Hide extension text
    }
});

extInput.addEventListener('input', () => {
    if (extInput.value.trim()) {
        displayExt.style.display = 'inline';
        extNumber.textContent = extInput.value;
    } else {
        displayExt.style.display = 'none';
        extNumber.textContent = '';
    }
});

function copyTable() {
    // Get the table element
    var table = document.getElementById('signatureTable');

    // Create a range object to select the content
    var range = document.createRange();
    range.selectNodeContents(table);

    // Get the selection object and add the range to it
    var selection = window.getSelection();
    selection.removeAllRanges(); // Clear any existing selections
    selection.addRange(range); // Select the table content

    // Copy the selected content to the clipboard
    try {
        var successful = document.execCommand('copy');
        if (successful) {
            alert('Table copied to clipboard!');
        } else {
            alert('Failed to copy table.');
        }
    } catch (err) {
        alert('Error copying table: ' + err);
    }

    // Remove the selection after copying
    selection.removeAllRanges();
}


fontSelected.addEventListener('change',() =>{
    if (fontSelected.value === 'Arial'){
        displayName.style.fontFamily = 'Arial';
        displayName.style.fontWeight = 'bold';
    }
    if (fontSelected.value === 'Cursive'){
        displayName.style.fontFamily = 'Brush Script MT';
        displayName.style.fontWeight = 'normal';
    }
});


