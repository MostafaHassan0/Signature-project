
const jobTitleInput = document.getElementById('jobtitle');
const frenchJobTitleInput = document.getElementById('frenchJobTitle');
const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('emailInput');

const nameurl = document.getElementById('name_url');

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

nameurl.addEventListener('input', () => {
    if (nameurl.value.trim() !== '') {
        url = nameurl.value.trim();
        displayName.innerHTML = `<img src="${url}" alt='${name}'>`;
    }
    else {
        displayName.textContent = fullNameInput.value.trim();
    }
});

jobTitleInput.addEventListener('input', () => {
    updateFrenchTranslation();
    displayJobTitle.textContent = jobTitleInput.value.trim();
});

frenchJobTitleInput.addEventListener('input', () => {
    displayFrenchJobTitle.textContent = frenchJobTitleInput.value.trim();
});

fullNameInput.addEventListener('input', () => {
    if (fullNameInput.value.trim() === '') {
        displayName.textContent = fullNameInput.value.trim();
    }
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
        displayNumber.innerHTML = `<a href="tel:+15143405000,${extn}">&nbsp;&nbsp;<img src="https://imgur.com/T7oPzFQ.png" alt="Phone Icon">
            &nbsp;(514) 340-5000 ext.${extn}</a>`;
    } else {
        extn='';
        displayNumber.innerHTML = `<a href="tel:+15143405000">&nbsp;&nbsp;<img src="https://imgur.com/T7oPzFQ.png" alt="Phone Icon">
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


