
const jobTitleInput = document.getElementById('jobtitle');
const frenchJobTitleInput = document.getElementById('frenchJobTitle');
const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('emailInput');


const displayName = document.getElementById('displayName');
const displayJobTitle = document.getElementById('displayJobTitle');
const displayFrenchJobTitle = document.getElementById('displayFrenchJobTitle');
const displayEmail = document.getElementById('displayEmail');

const extCheckbox = document.getElementById('toggleCheckbox');
const displayNumber = document.getElementById('displayNumber');
const extInput = document.getElementById('ext');

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
        displayEmail.style.display = 'inline';
        text = emailInput.value.trim();
        displayEmail.innerHTML = `<a href="mailto:${text}">${text}</a>`;
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
    if (extInput.value.trim() !== '') {
        extn = extInput.value.trim();
        displayNumber.innerHTML = `<a href="tel:+15143405000,${extn}">&nbsp;&nbsp;<img src="data:image/png;base64,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" alt="Phone Icon">
            &nbsp;(514) 340-5000 ext. ${extn}</a>`;
    } else {
        extn='';
        displayNumber.innerHTML = `<a href="tel:+15143405000">&nbsp;&nbsp;<img src="data:image/png;base64,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" alt="Phone Icon">
        &nbsp;(514) 340-5000</a>`;
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


