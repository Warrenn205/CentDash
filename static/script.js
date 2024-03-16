function addIncome() {
    var incomeStream = document.getElementById('income-streams');
    var newIncomeStream = document.createElement('div');

    newIncomeStream.innerHTML = `
        <div class="income-stream">
            <input type="text" placeholder="Enter Stream of Income">
            <input type="number" placeholder="Amount">
        <div>`;
    incomeStream.appendChild(newIncomeStream);
}

function addExpense() {
    var expenseCategory = document.getElementById('expense-fields');
    var newExpenseCategory = document.createElement('div');
    newExpenseCategory.innerHTML = `
        <div class="expense-category">
            <input type="text" placeholder="Enter expense">
            <input type="number" placeholder="Amount">
        </div>`
        expenseCategory.appendChild(newExpenseCategory);
}

function calculateBudget() {
    var income = document.querySelectorAll('#income-streams input[type="number"]');
    var expense = document.querySelectorAll('#expense-fields input[type="number"]');
    
    var totalIncome = 0;
    var totalExpenses = 0;
    
    income.forEach(function(incomes) {
      if (income.value !== '') {
        totalIncome = totalIncome + parseFloat(incomes.value);
      }
    });
    
    expense.forEach(function(expenses) {
      if (expense.value !== '') {
        totalExpenses = totalExpenses + parseFloat(expenses.value);
      }
    });

    var netIncome = totalIncome;
    var netExpenses = totalExpenses;
    var netTotal = totalIncome - totalExpenses;

    document.getElementById('income').innerHTML = "Net Income: $" + netIncome.toFixed(2);
    document.getElementById('expenses').innerHTML = "Net Expenses: $" + netExpenses.toFixed(2)
    document.getElementById('total').innerHTML = "Net Monthly Total: $" + netTotal.toFixed(2);

}

