document.getElementById('loan-form').addEventListener('submit', calculate);

function calculate(e) {
  e.preventDefault();

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //monthly payment
  const m = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * m * calculatedInterest) / (m - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principle).toFixed(2);
  } else {
    showError('Please check numbers');
  }
}

function showError(error) {
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}
