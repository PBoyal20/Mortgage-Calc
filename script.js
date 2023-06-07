document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const mortgageForm = document.getElementById('mortgageForm');
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const loanTermInput = document.getElementById('loanTerm');
    const downPaymentInput = document.getElementById('downPayment');
  
    // Handle form submission
    mortgageForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get input values
      const loanAmount = parseFloat(loanAmountInput.value);
      const interestRate = parseFloat(interestRateInput.value) / 100;
      const loanTerm = parseFloat(loanTermInput.value);
      const downPayment = parseFloat(downPaymentInput.value) || 0;
  
      // Calculate mortgage payment
      const principal = loanAmount - downPayment;
      const monthlyInterestRate = interestRate / 12;
      const numPayments = loanTerm;
      const mortgagePayment = calculateMortgagePayment(principal, monthlyInterestRate, numPayments);
  
      // Generate table of payment details
      const paymentDetailsTable = generatePaymentDetailsTable(principal, monthlyInterestRate, numPayments, mortgagePayment);
  
      // Display the result
      const resultElement = document.getElementById('result');
      resultElement.innerHTML = '';
      resultElement.appendChild(paymentDetailsTable);
    });
  
    // Function to calculate monthly mortgage payment
    function calculateMortgagePayment(principal, monthlyInterestRate, numPayments) {
      const monthlyPayment = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numPayments) /
        (Math.pow(1 + monthlyInterestRate, numPayments) - 1);
      return monthlyPayment;
    }
  
    // Function to generate table of payment details
function generatePaymentDetailsTable(principal, monthlyInterestRate, numPayments, monthlyPayment) {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-dark');
  
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
      <tr>
        <th scope="col">Month</th>
        <th scope="col">Payment</th>
        <th scope="col">Principal</th>
        <th scope="col">Interest</th>
        <th scope="col">Total Interest</th>
        <th scope="col">Balance</th>
      </tr>
    `;
  
    const tableBody = document.createElement('tbody');
  
    let balance = principal;
    let totalInterest = 0;
  
    for (let month = 1; month <= numPayments; month++) {
      const interest = balance * monthlyInterestRate;
      const paymentTowardsPrincipal = monthlyPayment - interest;
      balance -= paymentTowardsPrincipal;
      totalInterest += interest;
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${month}</td>
        <td>$${monthlyPayment.toFixed(2)}</td>
        <td>$${paymentTowardsPrincipal.toFixed(2)}</td>
        <td>$${interest.toFixed(2)}</td>
        <td>$${totalInterest.toFixed(2)}</td>
        <td>$${balance.toFixed(2)}</td>
      `;
  
      tableBody.appendChild(row);
    }
  
    table.appendChild(tableHeader);
    table.appendChild(tableBody);
  
    return table;
  }
  
  });
  