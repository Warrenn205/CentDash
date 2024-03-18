// Budgets

$(document).ready(function() {
    // Load stored input data when the page loads
    var storedInputData = JSON.parse(localStorage.getItem('inputData')) || { income: [], expenses: [] };
    if (storedInputData) {
        updateUIWithBudgetData(storedInputData);
        calculateBudget();
    }

    // Event handler for adding new income field
    $('#add-income').on('click', function() {
        addIncome();
    });

    // Event handler for adding new expense field
    $('#add-expense').on('click', function() {
        addExpense();
    });

    // Event handler for deleting income
    $(document).on('click', '.delete-income', function() {
        $(this).closest('.income-field').remove();
        saveAndRefreshBudgetData();
        calculateBudget(); // Recalculate budget after deletion
    });

    // Event handler for deleting expense
    $(document).on('click', '.delete-expense', function() {
        $(this).closest('.expense-category').remove();
        saveAndRefreshBudgetData();
        calculateBudget(); // Recalculate budget after deletion
    });

    // Event handler for calculating budget
    $('#calculate-budget').on('click', function() {
        calculateBudget();
    });

    // Event handler for updating input data
    $(document).on('input', '.income-field input, .expense-category input', function() {
        saveAndRefreshBudgetData();
        calculateBudget();
    });

    // Function to add a new income field
    function addIncome() {
        var incomeStream = $('.income-field').length + 1;
        var newIncomeStream = $('<div class="income-field"><input type="text" placeholder="Enter Stream of Income ' + incomeStream + '"><input type="number" placeholder="Amount"><button class="delete-income">Delete</button></div>');
        $('#income-streams').append(newIncomeStream);
    }

    // Function to add a new expense field
    function addExpense() {
        var expenseCategory = $('.expense-category').length + 1;
        var newExpenseCategory = $('<div class="expense-category"><input type="text" placeholder="Enter expense ' + expenseCategory + '"><input type="number" placeholder="Amount"><button class="delete-expense">Delete</button></div>');
        $('#expense-fields').append(newExpenseCategory);
    }

    // Function to calculate budget
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

        // Save calculated budget data
        var calculatedData = {
            netIncome: netIncome,
            netExpenses: netExpenses,
            netTotal: netTotal
        };
        localStorage.setItem('calculatedData', JSON.stringify(calculatedData));
    }

    // Function to save input data to localStorage
    function saveAndRefreshBudgetData() {
        var inputData = getBudgetData();
        localStorage.setItem('inputData', JSON.stringify(inputData));
    }

    // Function to retrieve budget data from input fields
    function getBudgetData() {
        var incomeData = [];
        var expenseData = [];

        // Retrieve income data
        $('.income-field').each(function() {
            var incomeStream = $(this).find('input[type="text"]').val();
            var amount = parseFloat($(this).find('input[type="number"]').val());
            if (incomeStream && !isNaN(amount)) {
                incomeData.push({ stream: incomeStream, amount: amount });
            }
        });

        // Retrieve expense data
        $('.expense-category').each(function() {
            var expenseCategory = $(this).find('input[type="text"]').val();
            var amount = parseFloat($(this).find('input[type="number"]').val());
            if (expenseCategory && !isNaN(amount)) {
                expenseData.push({ category: expenseCategory, amount: amount });
            }
        });

        return { income: incomeData, expenses: expenseData };
    }

    // Function to update UI with budget data
    function updateUIWithBudgetData(data) {
        // Clear existing input fields
        $('.income-field, .expense-category').remove();

        // Add income fields
        data.income.forEach(function(incomeItem) {
            var newIncomeStream = $('<div class="income-field"><input type="text" value="' + incomeItem.stream + '" placeholder="Enter Stream of Income"><input type="number" value="' + incomeItem.amount + '" placeholder="Amount"><button class="delete-income">Delete</button></div>');
            $('#income-streams').append(newIncomeStream);
        });

        // Add expense fields
        data.expenses.forEach(function(expenseItem) {
            var newExpenseCategory = $('<div class="expense-category"><input type="text" value="' + expenseItem.category + '" placeholder="Enter expense"><input type="number" value="' + expenseItem.amount + '" placeholder="Amount"><button class="delete-expense">Delete</button></div>');
            $('#expense-fields').append(newExpenseCategory);
        });
    }
});

// Net Worth

$(document).ready(function() {
    // Load stored input data when the page loads
    var storedAssetLiabilityData = JSON.parse(localStorage.getItem('assetLiabilityData')) || { assets: [], liabilities: [] };
    if (storedAssetLiabilityData) {
        updateUIWithNetWorthData(storedAssetLiabilityData);
        calculateNetWorth();
    }

    // Event handler for adding new asset field
    $('#add-asset').on('click', function() {
        addAsset();
    });

    // Event handler for adding new liability field
    $('#add-liability').on('click', function() {
        addLiability();
    });

    // Event handler for deleting asset
    $(document).on('click', '.delete-asset', function() {
        $(this).closest('.asset-field').remove();
        saveAndRefreshNetWorthData();
        calculateNetWorth(); // Recalculate net worth after deletion
    });

    // Event handler for deleting liability
    $(document).on('click', '.delete-liability', function() {
        $(this).closest('.liability-field').remove();
        saveAndRefreshNetWorthData();
        calculateNetWorth(); // Recalculate net worth after deletion
    });

    // Event handler for calculating net worth
    $('#calculate-networth').on('click', function() {
        calculateNetWorth();
    });

    // Event handler for updating input data
    $(document).on('input', '.asset-field input, .liability-field input', function() {
        saveAndRefreshNetWorthData();
        calculateNetWorth();
    });

    // Function to add a new asset field
    function addAsset() {
        var assetValue = $('.asset-field').length + 1;
        var newAssetValue = $('<div class="asset-field"><input type="text" placeholder="Enter Asset ' + assetValue + '"><input type="number" placeholder="Amount"><button class="delete-asset">Delete</button></div>');
        $('#assets').append(newAssetValue);
    }

    // Function to add a new liability field
    function addLiability() {
        var liabilityCategory = $('.liability-field').length + 1;
        var newLiabilityCategory = $('<div class="liability-field"><input type="text" placeholder="Enter liability ' + liabilityCategory + '"><input type="number" placeholder="Amount"><button class="delete-liability">Delete</button></div>');
        $('#liabilities').append(newLiabilityCategory);
    }

    // Function to calculate net worth
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

        // Save calculated net worth data
        var calculatedNetWorthData = {
            netWorth: netWorth
        };
        localStorage.setItem('calculatedNetWorthData', JSON.stringify(calculatedNetWorthData));
    }

    // Function to save input data to localStorage
    function saveAndRefreshNetWorthData() {
        var assetLiabilityData = getAssetLiabilityData();
        localStorage.setItem('assetLiabilityData', JSON.stringify(assetLiabilityData));
    }

    // Function to retrieve asset and liability data from input fields
    function getAssetLiabilityData() {
        var assetData = [];
        var liabilityData = [];

        // Retrieve asset data
        $('.asset-field').each(function() {
            var assetName = $(this).find('input[type="text"]').val();
            var amount = parseFloat($(this).find('input[type="number"]').val());
            if (assetName && !isNaN(amount)) {
                assetData.push({ name: assetName, amount: amount });
            }
        });

        // Retrieve liability data
        $('.liability-field').each(function() {
            var liabilityName = $(this).find('input[type="text"]').val();
            var amount = parseFloat($(this).find('input[type="number"]').val());
            if (liabilityName && !isNaN(amount)) {
                liabilityData.push({ name: liabilityName, amount: amount });
            }
        });

        return { assets: assetData, liabilities: liabilityData };
    }

    // Function to update UI with asset and liability data
    function updateUIWithNetWorthData(data) {
        // Clear existing input fields
        $('.asset-field, .liability-field').remove();

        // Add asset fields
        data.assets.forEach(function(assetItem) {
            var newAssetValue = $('<div class="asset-field"><input type="text" value="' + assetItem.name + '" placeholder="Enter Asset"><input type="number" value="' + assetItem.amount + '" placeholder="Amount"><button class="delete-asset">Delete</button></div>');
            $('#assets').append(newAssetValue);
        });

        // Add liability fields
        data.liabilities.forEach(function(liabilityItem) {
            var newLiabilityCategory = $('<div class="liability-field"><input type="text" value="' + liabilityItem.name + '" placeholder="Enter liability"><input type="number" value="' + liabilityItem.amount + '" placeholder="Amount"><button class="delete-liability">Delete</button></div>');
            $('#liabilities').append(newLiabilityCategory);
        });
    }
});
