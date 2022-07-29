// go back and fix line 34

const nameField = document.querySelector('#name');
const otherJobField = document.querySelector('#other-job-role');
const jobRoleSelect = document.querySelector('#title');

nameField.focus();

// shows and hides other field depending on job role
otherJobField.style.display = 'none';
jobRoleSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === 'other') {
        otherJobField.style.removeProperty('display');
    } else {
        otherJobField.style.display = 'none';
    }
});

const shirtDesignSelect = document.querySelector('#design');
const shirtColorSelect = document.querySelector('#color');
const jsPunsColors = document.querySelectorAll('[data-theme="js puns"]');
const heartJsColors = document.querySelectorAll('[data-theme="heart js"]');

// shirt color options are disabled until a design option is selected
shirtColorSelect.disabled = true;

// event listener for changes in design selection. this adds/removes hidden attribute to shirt colors
shirtDesignSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    const jsPunsOption = shirtDesignSelect[1];
    shirtColorSelect.disabled = false;

    for (let i = 0; i < 3; i++) {
        if (selected === jsPunsOption.value) {
            shirtColorSelect[0].selected = true;
            heartJsColors[i].hidden = true;
            jsPunsColors[i].hidden = false;
        } else {
            shirtColorSelect[0].selected = true;
            jsPunsColors[i].hidden = true;
            heartJsColors[i].hidden = false;
        }
    }
});

const activities = document.querySelectorAll('#activities input');
const activitiesCost = document.querySelector('#activities-cost');
const activityFieldset = document.querySelector('#activities');

// listen for changes in activities. when change occurs for loop adds cost of activity to total price if checked

activityFieldset.addEventListener('change', (e) => {
    const checked = e.target;
    const checkedPrice = checked.getAttribute('data-cost');
    const checkedDayTime = checked.getAttribute('data-day-and-time');
    let totalCost = 0;

    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        if (activity.checked) {
            totalCost += parseInt(checkedPrice);
        }
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;

    // when checked activity time & day matches other activities, disable conflicting activities
    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        const activityDayTime = activity.getAttribute('data-day-and-time')
        if (checkedDayTime === activityDayTime && activity !== checked && checked.checked === true) {
            activity.disabled = true;
            activity.parentElement.classList.add('disabled');
        } else if (checkedDayTime === activityDayTime && activity !== checked && checked.checked === false) {
            activity.disabled = false;
            activity.parentElement.classList.remove('disabled');
        }
    }
});

const paymentSelect = document.querySelector('#payment');
const paymentMethods = document.querySelector('.payment-methods').children
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitCoin = document.querySelector('#bitcoin');

// starts automatically on credit card
paymentSelect[1].selected = true;
creditCard.hidden = false;
payPal.hidden = true;
bitCoin.hidden = true;

// when user selects payment menthod it shows only the selected one and others are hidden
paymentSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    for (let i = 0; i < paymentMethods.length; i++) {

        if (selected === 'credit-card') {
            creditCard.hidden = false;
            paymentMethods[3].hidden = true;
            paymentMethods[4].hidden = true;
        }
        if (selected === 'paypal') {
            payPal.hidden = false;
            paymentMethods[2].hidden = true;
            paymentMethods[4].hidden = true;
        }
        if (selected === 'bitcoin') {
            bitCoin.hidden = false;
            paymentMethods[2].hidden = true;
            paymentMethods[3].hidden = true;
        }
    }
});

function nameValidator() {
    const nameValue = nameField.value;
    // regex provided by teamtreehouse interactive form input validation course
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue) && nameValue !== '';
    return nameIsValid
}

const emailField = document.querySelector('#email');

function emailValidator() {
    const emailValue = emailField.value;
    // regex provided by teamtreehouse interactive form input validation course
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue) && emailValue !== '';
    return emailIsValid;
}

function activityValidator() {
    let cost = activitiesCost.innerText;
    // regex to remove nondigits provided by Alex Wayne on stackoverflow
    cost = parseInt(cost.replace(/\D/g, ''));
    const activityIsValid = cost > 0;
    return activityIsValid;
}

const ccNumberField = document.querySelector('#cc-num');

function ccNumberValidator() {
    const ccNumberValue = ccNumberField.value;
    // regex to remove nondigits provided by Alex Wayne on stackoverflow
    const ccNumber = parseInt(ccNumberValue.replace(/\D/g, ''));
    const ccNumberIsValid = /^\d{13,16}$/g.test(ccNumber) && ccNumber !== '';
    return ccNumberIsValid;
}

const zipCodeField = document.querySelector('#zip');

function zipCodeValidator() {
    const zipCodeValue = zipCodeField.value;
    const zipCode = parseInt(zipCodeValue.replace(/\D/g, ''));
    const isZipCodeValid = /^\d{5}$/.test(zipCode) && zipCode !== '';
    return isZipCodeValid
}

const cvvField = document.querySelector('#cvv');

function cvvValidator() {
    const cvvValue = cvvField.value;
    const cvv = parseInt(cvvValue.replace(/\D/g, ''));
    const isCvvValid = /^\d{3}$/.test(cvv) && cvv !== '';
    return isCvvValid;
}


// prevents form submission and puts error message for invalid field
// shows checkmark by field if valid
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {

    if (!nameValidator()) {
        e.preventDefault();
        nameField.parentElement.classList.add('not-valid');
        nameField.parentElement.classList.remove('valid');
        nameField.parentElement.lastElementChild.classList.remove('hint');
        if (nameField.value === '') {
            nameField.parentElement.lastElementChild.innerText = 'Name field cannot be blank.'
        } else {
            nameField.parentElement.lastElementChild.innerText = 'Name must only contain alphabetical characters.'
        }
    }

    if (nameValidator()) {
        nameField.parentElement.classList.add('valid');
        nameField.parentElement.classList.remove('not-valid');
        nameField.parentElement.lastElementChild.classList.add('hint');
    }

    if (!emailValidator()) {
        e.preventDefault();
        emailField.parentElement.classList.add('not-valid');
        emailField.parentElement.classList.remove('valid');
        emailField.parentElement.lastElementChild.classList.remove('hint');
        if (emailField.value === '') {
            emailField.parentElement.lastElementChild.innerText = 'Email field cannot be blank.'
        } else {
            emailField.parentElement.lastElementChild.innerText = 'Email address must be formatted properly.'
        }
    }

    if (emailValidator()) {
        emailField.parentElement.classList.add('valid');
        emailField.parentElement.classList.remove('not-valid');
        emailField.parentElement.lastElementChild.classList.add('hint');
    }

    if (!activityValidator()) {
        e.preventDefault();
        activityFieldset.classList.add('not-valid');
        activityFieldset.classList.remove('valid');
        activityFieldset.lastElementChild.classList.remove('hint');
    }

    if (activityValidator()) {
        activityFieldset.classList.add('valid');
        activityFieldset.classList.remove('not-valid');
        activityFieldset.lastElementChild.classList.add('hint');
    }

    if (paymentSelect[1].selected) {
        if (!ccNumberValidator()) {
            e.preventDefault();
            ccNumberField.parentElement.classList.add('not-valid');
            ccNumberField.parentElement.classList.remove('valid');
            ccNumberField.parentElement.lastElementChild.classList.remove('hint');
        }

        if (ccNumberValidator()) {
            ccNumberField.parentElement.classList.add('valid');
            ccNumberField.parentElement.classList.remove('not-valid');
            ccNumberField.parentElement.lastElementChild.classList.add('hint');
        }
    }

    if (!zipCodeValidator()) {
        e.preventDefault();
        zipCodeField.parentElement.classList.add('not-valid');
        zipCodeField.parentElement.classList.remove('valid');
        zipCodeField.parentElement.lastElementChild.classList.remove('hint');
    }

    if (zipCodeValidator()) {
        zipCodeField.parentElement.classList.add('valid');
        zipCodeField.parentElement.classList.remove('not-valid');
        zipCodeField.parentElement.lastElementChild.classList.add('hint');
    }

    if (!cvvValidator()) {
        e.preventDefault();
        cvvField.parentElement.classList.add('not-valid');
        cvvField.parentElement.classList.remove('valid');
        cvvField.parentElement.lastElementChild.classList.remove('hint');
    }

    if (cvvValidator()) {
        cvvField.parentElement.classList.add('valid');
        cvvField.parentElement.classList.remove('not-valid');
        cvvField.parentElement.lastElementChild.classList.add('hint');
    }
});

// provides real time feedback to user for errors, conditional error messaging for name & email fields
nameField.addEventListener('keyup', () => {
    if (!nameValidator()) {
        nameField.parentElement.classList.add('not-valid');
        nameField.parentElement.classList.remove('valid');
        nameField.parentElement.lastElementChild.classList.remove('hint');
        if (nameField.value === '') {
            nameField.parentElement.lastElementChild.innerText = 'Name field cannot be blank.'
        } else {
            nameField.parentElement.lastElementChild.innerText = 'Name must only contain alphabetical characters.'
        }
    }

    if (nameValidator()) {
        nameField.parentElement.classList.add('valid');
        nameField.parentElement.classList.remove('not-valid');
        nameField.parentElement.lastElementChild.classList.add('hint');
    }
});

emailField.addEventListener('keyup', () => {
    if (!emailValidator()) {
        emailField.parentElement.classList.add('not-valid');
        emailField.parentElement.classList.remove('valid');
        emailField.parentElement.lastElementChild.classList.remove('hint');
        if (emailField.value === '') {
            emailField.parentElement.lastElementChild.innerText = 'Email field cannot be blank.'
        } else {
            emailField.parentElement.lastElementChild.innerText = 'Email address must be formatted properly.'
        }
    }

    if (emailValidator()) {
        emailField.parentElement.classList.add('valid');
        emailField.parentElement.classList.remove('not-valid');
        emailField.parentElement.lastElementChild.classList.add('hint');
    }
});

activityFieldset.addEventListener('change', () => {
    if (!activityValidator()) {
        activityFieldset.classList.add('not-valid');
        activityFieldset.classList.remove('valid');
        activityFieldset.lastElementChild.classList.remove('hint');
    }

    if (activityValidator()) {
        activityFieldset.classList.add('valid');
        activityFieldset.classList.remove('not-valid');
        activityFieldset.lastElementChild.classList.add('hint');
    }
});

ccNumberField.addEventListener('keyup', () => {
    if (!ccNumberValidator()) {
        ccNumberField.parentElement.classList.add('not-valid');
        ccNumberField.parentElement.classList.remove('valid');
        ccNumberField.parentElement.lastElementChild.classList.remove('hint');
    }

    if (ccNumberValidator()) {
        ccNumberField.parentElement.classList.add('valid');
        ccNumberField.parentElement.classList.remove('not-valid');
        ccNumberField.parentElement.lastElementChild.classList.add('hint');
    }
});

zipCodeField.addEventListener('keyup', () => {
    if (!zipCodeValidator()) {
        zipCodeField.parentElement.classList.add('not-valid');
        zipCodeField.parentElement.classList.remove('valid');
        zipCodeField.parentElement.lastElementChild.classList.remove('hint');
    }

    if (zipCodeValidator()) {
        zipCodeField.parentElement.classList.add('valid');
        zipCodeField.parentElement.classList.remove('not-valid');
        zipCodeField.parentElement.lastElementChild.classList.add('hint');
    }
});

cvvField.addEventListener('keyup', () => {
    if (!cvvValidator()) {
        cvvField.parentElement.classList.add('not-valid');
        cvvField.parentElement.classList.remove('valid');
        cvvField.parentElement.lastElementChild.classList.remove('hint');
    }

    if (cvvValidator()) {
        cvvField.parentElement.classList.add('valid');
        cvvField.parentElement.classList.remove('not-valid');
        cvvField.parentElement.lastElementChild.classList.add('hint');
    }
});

// adds more obvious focus indicator to activities when tabbing through
for (let i = 0; i < activities.length; i++) {
    const activityLabels = document.querySelectorAll('#activities label');
    const activity = activities[i];
    const label = activityLabels[i];

    activity.addEventListener('focus', () => {
        label.classList.add('focus');
    });

    activity.addEventListener('blur', () => {
        label.classList.remove('focus');
    });
}