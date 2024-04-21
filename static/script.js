// Budget function for "Budgets" tab
$(document).ready(function() {

    // Function for adding income input fields so user can enter streams of income.
    function addIncome() {
        var incomeStream = $('.income-field').length + 1; // Variable that allows users to add as many income input fields infinitely.
        var newIncomeStream = $('<div class="income-field"><input type="text" placeholder="Enter Stream of Income ' + incomeStream + '"><input type="number" placeholder="Amount"><button class="delete-income">Delete</button></div>');
        $('#income-streams').append(newIncomeStream);
    }

    // Add streams of income
    $('#add-income').on('click', function() {
        addIncome();
        calculateBudget(getBudgetData()); // Calculates Budget data that the user inputs.
    });

    $(document).on('click', '.delete-income', function() {
        $(this).closest('.income-field').remove();
        saveAndRefreshBudgetData();
        calculateBudget(getBudgetData()); 
    });

    // Function for adding expense input fields so user can enter categories of expenses.
      function addExpense() {
        var expenseCategory = $('.expense-category').length + 1; // Variable that allows users to add as many expense input fields infinitely.
        var newExpenseCategory = $('<div class="expense-category"><input type="text" placeholder="Enter expense ' + expenseCategory + '"><input type="number" placeholder="Amount"><button class="delete-expense">Delete</button></div>');
        $('#expense-fields').append(newExpenseCategory);
    }

     $('#add-expense').on('click', function() {
        addExpense();
        calculateBudget(getBudgetData()); 
    });

    $(document).on('click', '.delete-expense', function() {
        $(this).closest('.expense-category').remove();
        saveAndRefreshBudgetData();
        calculateBudget(getBudgetData()); 
    });

    // Function for calculating the budget from data inputted from income and expenses
    function calculateBudget(inputData) {
        var totalIncome = 0;
        var totalExpenses = 0;

        inputData.income.forEach(function(incomeItem) {
            totalIncome += incomeItem.amount;
        });
    
        inputData.expenses.forEach(function(expenseItem) {
            totalExpenses += expenseItem.amount;
        });
    
        var netTotal = totalIncome - totalExpenses;
    
        $('#income-summary').text("Total Income: $" + totalIncome.toFixed(2));
        $('#expenses-summary').text("Total Expenses: $" + totalExpenses.toFixed(2));
        $('#total-summary').text("Net Income: $" + netTotal.toFixed(2));
    
        var calculatedData = {
            totalIncome: totalIncome,
            totalExpenses: totalExpenses,
            netTotal: netTotal
        };
        localStorage.setItem('calculatedData', JSON.stringify(calculatedData));
    }

    $('#calculate-budget').on('click', function() {
        calculateBudget(getBudgetData());
    });

    $(document).on('input', '.income-field input, .expense-category input', function() {
        saveAndRefreshBudgetData();
        calculateBudget(getBudgetData());
    });

    // Storing input data from income and expenses fields.
    var storedInputData = JSON.parse(localStorage.getItem('inputData')) || { income: [], expenses: [] };
    if (storedInputData) {
        updateUIWithBudgetData(storedInputData);
        updateStatementsPage(storedInputData);
        updateDashboardPage(storedInputData);
        calculateBudget(storedInputData);
    }

    // Function for getting the budget data.
    function getBudgetData() {
        var incomeData = [];
        var expenseData = [];

       
        $('.income-field').each(function() {
            var incomeStream = $(this).find('input[type="text"]').val();
            var amount = parseFloat($(this).find('input[type="number"]').val());
            if (incomeStream && !isNaN(amount)) {
                incomeData.push({ stream: incomeStream, amount: amount });
            }
        });

        
        $('.expense-category').each(function() {
            var expenseCategory = $(this).find('input[type="text"]').val();
            var amount = parseFloat($(this).find('input[type="number"]').val());
            if (expenseCategory && !isNaN(amount)) {
                expenseData.push({ category: expenseCategory, amount: amount });
            }
        });

        return { income: incomeData, expenses: expenseData };
    }

    // Function for saving the budget data.
    function saveAndRefreshBudgetData() {
        var inputData = getBudgetData();
        localStorage.setItem('inputData', JSON.stringify(inputData));

        updateStatementsPage(inputData);
        updateDashboardPage(inputData);
    }

    // Function for updating the Statements page with data from the Budgets page.
    function updateStatementsPage(inputData) {
        var incomeSummaryHTML = '';
        inputData.income.forEach(function(incomeItem) {
            incomeSummaryHTML += '<p>' + incomeItem.stream + ': $' + incomeItem.amount.toFixed(2) + '</p>';
        });
        $('#income').html(incomeSummaryHTML);
        
        var totalIncome = inputData.income.reduce(function(total, item) {
            return total + item.amount;
        }, 0);
        
        $('#total-income').text('Total Income: $' + totalIncome.toFixed(2));

        var expenseSummaryHTML = '';
        inputData.expenses.forEach(function(expenseItem) {
            expenseSummaryHTML += '<p>' + expenseItem.category + ': $' + expenseItem.amount.toFixed(2) + '</p>';
        })
        $('#expenses').html(expenseSummaryHTML);

        var totalExpenses = inputData.expenses.reduce(function(total, item) {
             return total + item.amount;
         }, 0);

        $('#total-expenses').text('Total Expenses: $' + totalExpenses.toFixed(2));

        var netIncome = totalIncome - totalExpenses;
        $('#net-income').text('Net Income: $' + netIncome.toFixed(2));

    }

    // Function for updating the Dashboard page with data from the Budgets page.
    function updateDashboardPage(inputData) {
        var totalIncome = inputData.income.reduce(function(total, item) {
            return total + item.amount;
        }, 0);
        $('#income-card h3').text('Total Income: $' + totalIncome.toFixed(2));
    
        var totalExpenses = inputData.expenses.reduce(function(total, item) {
            return total + item.amount;
        }, 0);
        $('#expenses-card h3').text('Total Expenses: $' + totalExpenses.toFixed(2));
    
        var netIncome = totalIncome - totalExpenses;
        $('#net-income-card h3').text('Net Income: $' + netIncome.toFixed(2));

    }

    // Function for updating the UI with Budget data.
    function updateUIWithBudgetData(data) {
        
        $('.income-field, .expense-category').remove();

        
        data.income.forEach(function(incomeItem) {
            var newIncomeStream = $('<div class="income-field"><input type="text" value="' + incomeItem.stream + '" placeholder="Enter Stream of Income"><input type="number" value="' + incomeItem.amount + '" placeholder="Amount"><button class="delete-income">Delete</button></div>');
            $('#income-streams').append(newIncomeStream);
        });

        
        data.expenses.forEach(function(expenseItem) {
            var newExpenseCategory = $('<div class="expense-category"><input type="text" value="' + expenseItem.category + '" placeholder="Enter expense"><input type="number" value="' + expenseItem.amount + '" placeholder="Amount"><button class="delete-expense">Delete</button></div>');
            $('#expense-fields').append(newExpenseCategory);
        });
    }
});

// Net Worth function for "Net Worth" tab

$(document).ready(function() {
      
    // Function for adding asset input fields so user can enter assets.
    function addAsset() {
        var assetValue = $('.asset-field').length + 1; // Variable that allows users to add as many asset input fields infinitely.
        var newAssetValue = $('<div class="asset-field"><input type="text" placeholder="Enter Asset ' + assetValue + '"><input type="number" placeholder="Amount"><button class="delete-asset">Delete</button></div>');
        $('#assets').append(newAssetValue);
    }

    $('#add-asset').on('click', function() {
        addAsset();
        calculateNetWorth(getAssetLiabilityData());
    });

    $(document).on('click', '.delete-asset', function() {
        $(this).closest('.asset-field').remove();
        saveAndRefreshNetWorthData();
        calculateNetWorth(getAssetLiabilityData()); 
    });

    // Function for adding liabililty input fields so user can enter liabilities.
    function addLiability() {
        var liabilityCategory = $('.liability-field').length + 1;
        var newLiabilityCategory = $('<div class="liability-field"><input type="text" placeholder="Enter liability ' + liabilityCategory + '"><input type="number" placeholder="Amount"><button class="delete-liability">Delete</button></div>');
        $('#liabilities').append(newLiabilityCategory);
    }

    $('#add-liability').on('click', function() {
        addLiability();
        calculateNetWorth(getAssetLiabilityData());
    });

    $(document).on('click', '.delete-liability', function() {
        $(this).closest('.liability-field').remove();
        saveAndRefreshNetWorthData();
        calculateNetWorth(getAssetLiabilityData()); 
    });

    // Function for calculating the net worth from data inputted from assets and liabilities.
    function calculateNetWorth(assetLiabilityData) {
        var totalAssets = 0;
        var totalLiabilities = 0;

        assetLiabilityData.assets.forEach(function(assetItem) {
            totalAssets += assetItem.amount;
        });

        assetLiabilityData.liabilities.forEach(function(liabilitiesItem) {
            totalLiabilities += liabilitiesItem.amount;
        });

        var netWorth = totalAssets - totalLiabilities;

        $('#assets-summary').text("Total Assets: $" + totalAssets.toFixed(2));
        $('#liabilities-summary').text("Total Liabilities: $" + totalLiabilities.toFixed(2));
        $('#networth-summary').text("Net Worth: $" + netWorth.toFixed(2));

      
        var calculatedNetWorthData = {
            totalAssets: totalAssets,
            totalLiabilities: totalLiabilities,
            netWorth: netWorth
        };
        localStorage.setItem('calculatedNetWorthData', JSON.stringify(calculatedNetWorthData));
    }


    $('#calculate-networth').on('click', function() {
        calculateNetWorth(getAssetLiabilityData());
    });

    
    $(document).on('input', '.asset-field input, .liability-field input', function() {
        saveAndRefreshNetWorthData();
        calculateNetWorth(getAssetLiabilityData());
    });

    // Storing input data from assets and liability fields.
    var storedAssetLiabilityData = JSON.parse(localStorage.getItem('assetLiabilityData')) || { assets: [], liabilities: [] };
    if (storedAssetLiabilityData) {
        updateUIWithNetWorthData(storedAssetLiabilityData);
        updateStatementsPage(storedAssetLiabilityData);
        updateDashboardPage(storedAssetLiabilityData);
        calculateNetWorth(storedAssetLiabilityData);
    }
    
    function saveAndRefreshNetWorthData() {
        var assetLiabilityData = getAssetLiabilityData();
        localStorage.setItem('assetLiabilityData', JSON.stringify(assetLiabilityData));

        updateStatementsPage(assetLiabilityData);
        updateDashboardPage(assetLiabilityData);
    }


    // Function for getting the asset and liabililty data.
    function getAssetLiabilityData() {
        var assetData = [];
        var liabilityData = [];

        
        $('.asset-field').each(function() {
            var assetName = $(this).find('input[type="text"]').val();
            var amount = parseFloat($(this).find('input[type="number"]').val());
            if (assetName && !isNaN(amount)) {
                assetData.push({ name: assetName, amount: amount });
            }
        });

      
        $('.liability-field').each(function() {
            var liabilityName = $(this).find('input[type="text"]').val();
            var amount = parseFloat($(this).find('input[type="number"]').val());
            if (liabilityName && !isNaN(amount)) {
                liabilityData.push({ name: liabilityName, amount: amount });
            }
        });

        return { assets: assetData, liabilities: liabilityData };
    }

    // Function for updating the statements page with data from the Net Worth page
    function updateStatementsPage(assetLiabilityData) {
        var assetsSummaryHTML = '';
        assetLiabilityData.assets.forEach(function(assetItem) {
            assetsSummaryHTML += '<p>' + assetItem.name + ': $' + assetItem.amount.toFixed(2) + '</p>';
        });
        $('#assetData').html(assetsSummaryHTML);
        
        var totalAssets = assetLiabilityData.assets.reduce(function(total, item) {
            return total + item.amount;
        }, 0);
        
        $('#total-assets').text('Total Assets: $' + totalAssets.toFixed(2));

        var liabilitiesSummaryHTML = '';
        assetLiabilityData.liabilities.forEach(function(liabilityItem) {
            liabilitiesSummaryHTML += '<p>' + liabilityItem.name + ': $' + liabilityItem.amount.toFixed(2) + '</p>';
        })
        $('#liabilitiesData').html(liabilitiesSummaryHTML);

        var totalLiabilities = assetLiabilityData.liabilities.reduce(function(total, item) {
             return total + item.amount;
         }, 0);

        $('#total-liabilities').text('Total Liabilities: $' + totalLiabilities.toFixed(2));

        var netWorth = totalAssets - totalLiabilities;
        $('#net-worth-data').text('Net Worth: $' + netWorth.toFixed(2));

    }
    
    // Function for updating the Dashboard page with data from the Net Worth page.
    function updateDashboardPage(assetLiabilityData) {
        var totalAssets = assetLiabilityData.assets.reduce(function(total, item) {
            return total + item.amount;
        }, 0);
        $('#assets-card h3').text('Total Assets: $' + totalAssets.toFixed(2));
    
        var totalLiabilities = assetLiabilityData.liabilities.reduce(function(total, item) {
            return total + item.amount;
        }, 0);
        $('#liabilities-card h3').text('Total Liabilities: $' + totalLiabilities.toFixed(2));
    
        var netWorth = totalAssets - totalLiabilities;
        $('#net-worth-card h3').text('Net Worth: $' + netWorth.toFixed(2));

    }
    

     // Function for updating the UI with Net Worth data. 
    function updateUIWithNetWorthData(data) {
        
        $('.asset-field, .liability-field').remove();

        
        data.assets.forEach(function(assetItem) {
            var newAssetValue = $('<div class="asset-field"><input type="text" value="' + assetItem.name + '" placeholder="Enter Asset"><input type="number" value="' + assetItem.amount + '" placeholder="Amount"><button class="delete-asset">Delete</button></div>');
            $('#assets').append(newAssetValue);
        });

      
        data.liabilities.forEach(function(liabilityItem) {
            var newLiabilityCategory = $('<div class="liability-field"><input type="text" value="' + liabilityItem.name + '" placeholder="Enter liability"><input type="number" value="' + liabilityItem.amount + '" placeholder="Amount"><button class="delete-liability">Delete</button></div>');
            $('#liabilities').append(newLiabilityCategory);
        });
    }
});

// Goals function for "Goals" tab.

$(document).ready(function() {
    var goalCount = 0;

    // Function to add goals to a list that will display on the page.
    function addGoalToList(goalText) {
        goalCount++;
        var listItem = $('<li>').addClass('goal-item');
        var goalNumber = $('<span>').addClass('goal-number').text(goalCount + ". ");
        var goalTextSpan = $('<span>').addClass('goal-text').text(goalText);
        var deleteButton = $('<button>').addClass('delete-goal').text('x');
        deleteButton.click(function() {
            listItem.remove();
            updateGoalNumbers(); 
        });
        listItem.append(goalNumber, goalTextSpan, deleteButton);
        $('#goal-list').append(listItem);
    }

    // Function to update the numbering of the list of goals.
    function updateGoalNumbers() {
        $('.goal-item').each(function(index) {
            $(this).find('.goal-number').text((index + 1) + ". ");
        });
        goalCount = $('.goal-item').length;
    }

    // Function to add goals to the list when a user clicks the "Add" button.
    $('#add-goal-btn').click(function() {
        var goalText = $('#goal-input').val().trim();
        if (goalText !== '') {
            addGoalToList(goalText);
            $('#goal-input').val(''); 
        }
    });

    $('#goal-input').keypress(function(event) {
        if (event.which === 13) { 
            $('#add-goal-btn').click();
        }
    });
});


