// Budgets

$(function() {
  function addIncome() {
      var incomeStream = $('.income-field').length + 1;
      var newIncomeStream = $('<div class="income-field"><input type="text" placeholder="Enter Stream of Income ' + incomeStream + '"><input type="number" placeholder="Amount"><button class="delete-income">Delete</button></div>');
      $('#income-streams').append(newIncomeStream);
  }

  $('#add-income').on('click', function() {
      addIncome();
      calculateBudget(); 
  });

  function addExpense() {
      var expenseCategory = $('.expense-category').length + 1;
      var newExpenseCategory = $('<div class="expense-category"><input type="text" placeholder="Enter expense ' + expenseCategory + '"><input type="number" placeholder="Amount"><button class="delete-expense">Delete</button></div>');
      $('#expense-fields').append(newExpenseCategory);
  }

  $('#add-expense').on('click', function() {
      addExpense();
      calculateBudget(); 
  });

  $(document).on('click', '.delete-income', function() {
      $(this).closest('.income-field').remove();
      calculateBudget(); 
  });

  $(document).on('click', '.delete-expense', function() {
      $(this).closest('.expense-category').remove();
      calculateBudget(); 
  });

  $('#calculate-budget').on('click', function() {
      calculateBudget(); 
  });

  function calculateBudget() {
      var totalIncome = 0;
      var totalExpenses = 0;

      $('.income-field input[type="number"]').each(function() {
          var incomeValue = parseFloat($(this).val());
          if (!isNaN(incomeValue)) {
              totalIncome = totalIncome + incomeValue;
          }
      });

      $('.expense-category input[type="number"]').each(function() {
          var expenseValue = parseFloat($(this).val());
          if (!isNaN(expenseValue)) {
              totalExpenses = totalExpenses + expenseValue;
          }
      });

      var netIncome = totalIncome;
      var netExpenses = totalExpenses;
      var netTotal = totalIncome - totalExpenses;

      $('#income-summary').text("Net Income: $" + netIncome.toFixed(2));
      $('#expenses-summary').text("Net Expenses: $" + netExpenses.toFixed(2));
      $('#total-summary').text("Net Monthly Total: $" + netTotal.toFixed(2));
  }
});

// Net Worth

$(function() {
  function addAssets() {
      var assetValue = $('.asset-field').length + 1;
      var newAssetValue = $('<div class="asset-field"><input type="text" placeholder="Enter Asset ' + assetValue + '"><input type="number" placeholder="Amount"><button class="delete-asset">Delete</button></div>');
      $('#assets').append(newAssetValue);
  }

  $('#add-asset').on('click', function() {
      addAssets();
      calculateNetWorth(); 
  });

  function addLiabilities() {
      var liabilityCategory = $('.liability-field').length + 1;
      var newLiabilityCategory = $('<div class="expense-category"><input type="text" placeholder="Enter liability ' + liabilityCategory + '"><input type="number" placeholder="Amount"><button class="delete-liability">Delete</button></div>');
      $('#liability-field').append(newLiabilityCategory);
  }

  $('#add-expense').on('click', function() {
      addExpense();
      calculateNetWorth(); 
  });

  $(document).on('click', '.delete-asset', function() {
      $(this).closest('.income-field').remove();
      calculateNetWorth(); 
  });

  $(document).on('click', '.delete-liability', function() {
      $(this).closest('.expense-category').remove();
      calculateWorth(); 
  });

  $('#calculate-networth').on('click', function() {
      calculateNetWorth(); 
  });

  function calculateNetWorth() {
      var totalAssets = 0;
      var totalLiabilities = 0;

      $('.asset-field input[type="number"]').each(function() {
          var assetValue = parseFloat($(this).val());
          if (!isNaN(assetValue)) {
              totalAssets = totalAssets + assetValue;
          }
      });

      $('.liability-field input[type="number"]').each(function() {
          var liabilityValue = parseFloat($(this).val());
          if (!isNaN(liabilityValue)) {
              totalLiabilities = totalLiabilities + liabilityValue;
          }
      });

      var netWorth = totalAssets - totalLiabilities;

      $('#networth-summary').text("Net Worth: $" + netWorth.toFixed(2));
  }
});