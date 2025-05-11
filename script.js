var educationSelect = document.getElementById('education');
var netWorthSelect = document.getElementById('netWorth');
var casteSelect = document.getElementById('caste');
var skillCheckboxes = document.getElementsByName('skill');
var ageRadios = document.getElementsByName('age');
var reputationCoeffCheckboxes = document.getElementsByName('reputation-coeff');
var reputationSubtractCheckbox = document.getElementById('rep-general');
var calculateButton = document.getElementById('calculate-button');
var finalPriceDisplay = document.getElementById('final-price');
var resultContainer = document.getElementById('result-container');
var STARTING_BID = 100;
function calculatePrice() {
    var price = STARTING_BID;
    var coefficient = 1.0;
    var additions = 0;
    var subtractions = 0;

    coefficient=coefficient * parseFloat(educationSelect.value);
    coefficient=coefficient * parseFloat(netWorthSelect.value);

    var selectedAgeValue = 1.0;
    for (var i=0; i < ageRadios.length; i++) {
        if (ageRadios[i].checked) {
            selectedAgeValue = parseFloat(ageRadios[i].value);
        }
    }
    coefficient = coefficient * selectedAgeValue;

    for (var j=0; j < reputationCoeffCheckboxes.length; j++) {
        if (reputationCoeffCheckboxes[j].checked) {
            coefficient = coefficient * parseFloat(reputationCoeffCheckboxes[j].value);
        }
    }
    price = price * coefficient;
    additions = additions + parseInt(casteSelect.value);

    for (var k=0; k < skillCheckboxes.length; k++) {
        if (skillCheckboxes[k].checked) {
            additions = additions + parseInt(skillCheckboxes[k].value);
        }
    }
    if (reputationSubtractCheckbox.checked) {
        subtractions = subtractions + Math.abs(parseInt(reputationSubtractCheckbox.value));
    }

    price = price + additions;
    price = price - subtractions;

    if (price < 0) {
        price=0;
    }
    finalPriceDisplay.textContent = "$" + price.toFixed(2);
    calculateButton.textContent = 'Recalculate price';

    var messageElement = document.getElementById('calculation-message');
    if (!messageElement) {
        messageElement = document.createElement('p');
        messageElement.id = 'calculation-message';
        resultContainer.appendChild(messageElement);
    }
    messageElement.textContent = 'Calculation complete';
}
calculateButton.onclick = calculatePrice;