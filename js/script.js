const nameField = document.querySelector('#name');
const otherJobField = document.querySelector('#other-job-role');
const jobRoleSelect = document.querySelector('#title');

// starts with name field focused upon load
nameField.focus();

// starts with jobfield hidden
otherJobField.style.display = 'none';

// shows and hides other field depending on choice
jobRoleSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === 'other'){
        otherJobField.style.removeProperty('display');
    } else {
        otherJobField.style.display = 'none';
    }
});

const shirtDesignSelect = document.querySelector('#design');
const shirtColorSelect = document.querySelector('#color');

shirtColorSelect.disabled = true;

shirtDesignSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    const jsPunsOption = shirtDesignSelect[1];
    const heartJsOption = shirtDesignSelect[2];

    shirtColorSelect.disabled = false;

    if (jsPunsOption.selected = true){
        console.log('js puns')
    }
    
    if (heartJsOption.selected = true) {
        console.log('heart js')
    }
/*     user selects theme js puns
        colors display cornflower, slate, and gold
        hides tomato, steel blue, and grey
    user selescts theme i love js
        colors display tomato, steel blue, and grey
        hides cornflower, slate, and gold
    end if */
});