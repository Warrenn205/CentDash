function addIncome(amount) {
    var incomeStream = document.getElementById('incomeFields');
    var displayIncome = document.getElementById('displayIncome');

    for (var i = 0; i < amount; i++) {
        var newIncomeStream = document.createElement('div');
        newIncomeStream.classList.add('income');

        var newIncomeStream = document.createElement('input');
        newIncomeStream.type = 'amount';
        newIncomeStream.name = 'incomeField[]';
        newIncomeStream.placeholder = 'Enter amount of income';

        newIncomeStream.appendChild(newIncomeStream);
        incomeStreamContainer.appendChild(incomeStream);

        var displayAmount = document.createElement('p');
        displayAmount.textContent = "Input: " + (i + 1) + ", Value: " + newIncomeStream.value;
        displayIncome.appendChild(displayAmount);
    }
}
