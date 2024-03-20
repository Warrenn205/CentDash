// Budget function for "Budgets" tab
$(document).ready(function() {

    function addIncome() {
        var incomeStream = $('.income-field').length + 1;
        var newIncomeStream = $('<div class="income-field"><input type="text" placeholder="Enter Stream of Income ' + incomeStream + '"><input type="number" placeholder="Amount"><button class="delete-income">Delete</button></div>');
        $('#income-streams').append(newIncomeStream);
    }

    $('#add-income').on('click', function() {
        addIncome();
        calculateBudget(getBudgetData());
    });

    $(document).on('click', '.delete-income', function() {
        $(this).closest('.income-field').remove();
        saveAndRefreshBudgetData();
        calculateBudget(getBudgetData()); 
    });

      function addExpense() {
        var expenseCategory = $('.expense-category').length + 1;
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

    function calculateBudget(inputData) {
        var totalIncome = 0;
        var totalExpenses = 0;
    
        // Calculate total income
        inputData.income.forEach(function(incomeItem) {
            totalIncome += incomeItem.amount;
        });
    
        // Calculate total expenses
        inputData.expenses.forEach(function(expenseItem) {
            totalExpenses += expenseItem.amount;
        });
    
        // Calculate net total
        var netTotal = totalIncome - totalExpenses;
    
        // Update HTML elements with the calculated values
        $('#income-summary').text("Total Income: $" + totalIncome.toFixed(2));
        $('#expenses-summary').text("Total Expenses: $" + totalExpenses.toFixed(2));
        $('#total-summary').text("Net Income: $" + netTotal.toFixed(2));
    
        // Store calculated data in local storage
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

    var storedInputData = JSON.parse(localStorage.getItem('inputData')) || { income: [], expenses: [] };
    if (storedInputData) {
        updateUIWithBudgetData(storedInputData);
        updateStatementsPage(storedInputData);
        calculateBudget(storedInputData);
    }

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

    function saveAndRefreshBudgetData() {
        var inputData = getBudgetData();
        localStorage.setItem('inputData', JSON.stringify(inputData));

        updateStatementsPage(inputData);
    }

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


// Net Worth

$(document).ready(function() {
      
    
    function addAsset() {
        var assetValue = $('.asset-field').length + 1;
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

        $('#networth-summary').text("Net Worth: $" + netWorth.toFixed(2));

      
        var calculatedNetWorthData = {
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

    var storedAssetLiabilityData = JSON.parse(localStorage.getItem('assetLiabilityData')) || { assets: [], liabilities: [] };
    if (storedAssetLiabilityData) {
        updateUIWithNetWorthData(storedAssetLiabilityData);
        updateStatementsPage(storedAssetLiabilityData);
        calculateNetWorth(storedAssetLiabilityData);
    }
    
    function saveAndRefreshNetWorthData() {
        var assetLiabilityData = getAssetLiabilityData();
        localStorage.setItem('assetLiabilityData', JSON.stringify(assetLiabilityData));

        updateStatementsPage(assetLiabilityData);
    }

    
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