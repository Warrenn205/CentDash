// Budgets

$(document).ready(function() {
    
    var storedInputData = JSON.parse(localStorage.getItem('inputData')) || { income: [], expenses: [] };
    if (storedInputData) {
        updateUIWithBudgetData(storedInputData);
        calculateBudget();
    }

    
    $('#add-income').on('click', function() {
        addIncome();
    });

    
    $('#add-expense').on('click', function() {
        addExpense();
    });

    
    $(document).on('click', '.delete-income', function() {
        $(this).closest('.income-field').remove();
        saveAndRefreshBudgetData();
        calculateBudget(); 
    });

    
    $(document).on('click', '.delete-expense', function() {
        $(this).closest('.expense-category').remove();
        saveAndRefreshBudgetData();
        calculateBudget(); 
    });

   
    $('#calculate-budget').on('click', function() {
        calculateBudget();
    });

    
    $(document).on('input', '.income-field input, .expense-category input', function() {
        saveAndRefreshBudgetData();
        calculateBudget();
    });

    
    function addIncome() {
        var incomeStream = $('.income-field').length + 1;
        var newIncomeStream = $('<div class="income-field"><input type="text" placeholder="Enter Stream of Income ' + incomeStream + '"><input type="number" placeholder="Amount"><button class="delete-income">Delete</button></div>');
        $('#income-streams').append(newIncomeStream);
    }

    
    function addExpense() {
        var expenseCategory = $('.expense-category').length + 1;
        var newExpenseCategory = $('<div class="expense-category"><input type="text" placeholder="Enter expense ' + expenseCategory + '"><input type="number" placeholder="Amount"><button class="delete-expense">Delete</button></div>');
        $('#expense-fields').append(newExpenseCategory);
    }

   
    function calculateBudget() {
        var totalIncome = 0;
        var totalExpenses = 0;

        $('.income-field input[type="number"]').each(function() {
            var incomeValue = parseFloat($(this).val());
            if (!isNaN(incomeValue)) {
                totalIncome += incomeValue;
            }
        });

        $('.expense-category input[type="number"]').each(function() {
            var expenseValue = parseFloat($(this).val());
            if (!isNaN(expenseValue)) {
                totalExpenses += expenseValue;
            }
        });

        var netIncome = totalIncome;
        var netExpenses = totalExpenses;
        var netTotal = totalIncome - totalExpenses;

        $('#income-summary').text("Net Income: $" + netIncome.toFixed(2));
        $('#expenses-summary').text("Net Expenses: $" + netExpenses.toFixed(2));
        $('#total-summary').text("Net Monthly Total: $" + netTotal.toFixed(2));

       
        var calculatedData = {
            netIncome: netIncome,
            netExpenses: netExpenses,
            netTotal: netTotal
        };
        localStorage.setItem('calculatedData', JSON.stringify(calculatedData));
    }

   
    function saveAndRefreshBudgetData() {
        var inputData = getBudgetData();
        localStorage.setItem('inputData', JSON.stringify(inputData));
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
    
    var storedAssetLiabilityData = JSON.parse(localStorage.getItem('assetLiabilityData')) || { assets: [], liabilities: [] };
    if (storedAssetLiabilityData) {
        updateUIWithNetWorthData(storedAssetLiabilityData);
        calculateNetWorth();
    }

   
    $('#add-asset').on('click', function() {
        addAsset();
    });

    
    $('#add-liability').on('click', function() {
        addLiability();
    });

   
    $(document).on('click', '.delete-asset', function() {
        $(this).closest('.asset-field').remove();
        saveAndRefreshNetWorthData();
        calculateNetWorth(); 
    });

    
    $(document).on('click', '.delete-liability', function() {
        $(this).closest('.liability-field').remove();
        saveAndRefreshNetWorthData();
        calculateNetWorth(); 
    });

    
    $('#calculate-networth').on('click', function() {
        calculateNetWorth();
    });

    
    $(document).on('input', '.asset-field input, .liability-field input', function() {
        saveAndRefreshNetWorthData();
        calculateNetWorth();
    });

    
    function addAsset() {
        var assetValue = $('.asset-field').length + 1;
        var newAssetValue = $('<div class="asset-field"><input type="text" placeholder="Enter Asset ' + assetValue + '"><input type="number" placeholder="Amount"><button class="delete-asset">Delete</button></div>');
        $('#assets').append(newAssetValue);
    }

    
    function addLiability() {
        var liabilityCategory = $('.liability-field').length + 1;
        var newLiabilityCategory = $('<div class="liability-field"><input type="text" placeholder="Enter liability ' + liabilityCategory + '"><input type="number" placeholder="Amount"><button class="delete-liability">Delete</button></div>');
        $('#liabilities').append(newLiabilityCategory);
    }

  
    function calculateNetWorth() {
        var totalAssets = 0;
        var totalLiabilities = 0;

        $('.asset-field input[type="number"]').each(function() {
            var assetValue = parseFloat($(this).val());
            if (!isNaN(assetValue)) {
                totalAssets += assetValue;
            }
        });

        $('.liability-field input[type="number"]').each(function() {
            var liabilityValue = parseFloat($(this).val());
            if (!isNaN(liabilityValue)) {
                totalLiabilities += liabilityValue;
            }
        });

        var netWorth = totalAssets - totalLiabilities;

        $('#networth-summary').text("Net Worth: $" + netWorth.toFixed(2));

      
        var calculatedNetWorthData = {
            netWorth: netWorth
        };
        localStorage.setItem('calculatedNetWorthData', JSON.stringify(calculatedNetWorthData));
    }

    
    function saveAndRefreshNetWorthData() {
        var assetLiabilityData = getAssetLiabilityData();
        localStorage.setItem('assetLiabilityData', JSON.stringify(assetLiabilityData));
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
