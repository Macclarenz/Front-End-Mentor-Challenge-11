billInput = document.querySelector('#bill-input');
nopInput = document.querySelector('#nop-input');
resultTip = document.querySelector('#result-tip-amount');
resultTotal = document.querySelector('#result-total');
resultReset = document.querySelector('.result-reset-input');
tipInput = document.querySelectorAll('.tip-input');

// tip IDs
const tip5 = document.querySelector('#tip-5');
const tip10 = document.querySelector('#tip-10');
const tip15 = document.querySelector('#tip-15');
const tip25 = document.querySelector('#tip-25');
const tip50 = document.querySelector('#tip-50');
const tipCustom = document.querySelector('#tip-custom');

// Format number with comma
const numberFormat = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
})
// maximumFractionDigits - for two digits decimal (1.50)

// MAIN FUNCTION
function functionality(id, tip) {
    checkingInputs(id, tip);
}

// CHECK INPUTS
function checkingInputs(id, tip) {
    const billValue = parseFloat(billInput.value);
    const nopValue = parseFloat(nopInput.value);
    const billError = document.querySelector('.bill-error-msg');
    const nopError = document.querySelector('.nop-error-msg');

    if (billValue == 0 || billInput.value == '') {
        billError.innerHTML = `Can't be blank / zero`;
        billInput.classList.add('error-active')
        billError.classList.add('error-msg')
    } else {
        billInput.classList.remove('error-active');
        billError.classList.add('error-msg')
        billError.innerHTML = '';
    }

    if (nopValue == 0 || nopInput.value == '') {
        nopError.innerHTML = `Can't be blank / zero`;
        nopInput.classList.add('error-active');
        nopError.classList.add('error-msg')
    } else {
        nopInput.classList.remove('error-active')
        nopError.classList.add('error-msg')
        nopError.innerHTML = '';
    }

    if (billValue !== 0 || billInput.value !== '' && nopValue !== 0 || nopInput.value !== '') {
        tipAmountPerPerson(id, tip)
    }
}

// TIP AMOUNT PER PERSON
function tipAmountPerPerson(id, tip = 0) {
    const bill = billInput.value || 0;
    const people = nopInput.value;
    let tipAmount;

    if (id === '#tip-custom') {
        tipAmount = tip / people;
    } else {
        tipAmount = (bill * tip) / people;
    }

    if (people > 0) {
        if (bill > 0) {
            resultTip.value = `$${numberFormat.format(tipAmount)}`;
            resultTotal.value = totalPerPerson(bill, people, tipAmount);
        }
    }
    resetBtn()
    activeEvent(id)
}

function totalPerPerson(bill, people, tipAmount) {
    const totalAmount = (bill / people) + tipAmount;
    return `$${numberFormat.format(totalAmount)}`;
}

// BUTTONS & CUSTOM INPUT ACTIVE EVENT
function activeEvent(e) {
    removeEvent();
    if (e === '#tip-custom') {
        document.querySelector(e).classList.add('tip-custom-active');
    } else {
        document.querySelector(e).classList.add('tip-input-active');
        tipCustom.value = '';
    }
}

// REMOVE BUTTONS & CUSTOM INPUT ACTIVE EVENT
function removeEvent() {
    tipInput.forEach(tip => tip.classList.remove('tip-input-active'))
    tipInput.forEach(tip => tip.classList.remove('tip-custom-active'))
}

// EVENT LISTENER
tipCustom.onclick = function () {
    activeEvent('#tip-custom')
};
tip5.onclick = function () {
    functionality('#tip-5', parseFloat(this.value) / 100)
}
tip10.onclick = function () {
    functionality('#tip-10', parseFloat(this.value) / 100)
}
tip15.onclick = function () {
    functionality('#tip-15', parseFloat(this.value) / 100)
}
tip25.onclick = function () {
    functionality('#tip-25', parseFloat(this.value) / 100)
}
tip50.onclick = function () {
    functionality('#tip-50', parseFloat(this.value) / 100)
}

tipCustom.onclick = function () {
    functionality('#tip-custom', this.value)
}

tipCustom.oninput = function () {
    functionality('#tip-custom', this.value)
}

billInput.oninput = function () {
    this.classList.remove('error-active');
    document.querySelector('.bill-error-msg').classList.remove('error-msg');
    removeEvent();
}

nopInput.oninput = function () {
    this.classList.remove('error-active');
    document.querySelector('.nop-error-msg').classList.remove('error-msg');
    removeEvent();

}

// RESET BUTTON - ENABLE/DISABLE
function resetBtn() {
    if (resultTip.value === '$0.00' && resultTotal.value === '$0.00') {
        resultReset.disabled = true;
    } else {
        resultReset.disabled = false;
    }
}

// RESET BUTTON - FUNCTION
resultReset.addEventListener('click', () => {
    removeEvent();
    billInput.value = '';
    nopInput.value = '';
    resultTip.value = '$0.00';
    resultTotal.value = '$0.00';
    tipCustom.value = '';

    resetBtn();
})