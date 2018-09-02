//listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    //Hide results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1200);

    e.preventDefault();
});

//
function calculateResults() {
    console.log('calc');
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalinterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compuute monthly payments
    const x = (1 + calculatedInterest)**calculatedPayments;
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalinterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show results
        document.getElementById('results').style.display = 'block';

        //hide spinner
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers');
    }
}

// SHow error
function showError(error) {
    //hide results
    document.getElementById('results').style.display = 'none';

    //hide spinner
    document.getElementById('loading').style.display = 'none';

    //create div
    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = 'alert alert-danger';

    //Create text node  and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 2500);
}

//clear error
function clearError() {
    document.querySelector('.alert').remove();
}