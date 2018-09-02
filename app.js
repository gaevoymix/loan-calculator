class Loan {
    constructor(amount, interest, years) {
        this.amount = amount;
        this.interest = interest;
        this.years = years;
    }
}

class UI {
    calculate(loan) {
        //UI variables
        const monthlyPayment = document.getElementById('monthly-payment');
        const totalPayment = document.getElementById('total-payment');
        const totalinterest = document.getElementById('total-interest');

        const principal = parseFloat(loan.amount);
        const calculatedInterest = parseFloat(loan.interest) / 100 / 12;
        const calculatedPayments = parseFloat(loan.years) * 12;

        //compuute monthly payments
        const x = (1 + calculatedInterest)**calculatedPayments;
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalinterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show results
        document.getElementById('results').style.display = 'block';

        //hide spinner
        document.getElementById('loading').style.display = 'none';

    }

    showError(error) {
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
        setTimeout(this.clearError, 2500);
    }

    hideResults() {
        document.getElementById('results').style.display = 'none';
    }

    //clear error
    clearError() {
        document.querySelector('.alert').remove();
    }

    showLoader(loan) {
        //Hide results
        document.getElementById('results').style.display = 'none';

        document.getElementById('loading').style.display = 'block';

        setTimeout(this.calculate, 1000, loan);


    }
}

//listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {

    //get values
    const amount = document.getElementById('amount').value,
        interest = document.getElementById('interest').value,
        years = document.getElementById('years').value;

    //instantiate loan
    const loan = new Loan(amount, interest, years);

    //instantiate ui
    const ui = new UI();

    //validate
    if(amount === '' || interest === '' || years === '') {
        ui.showError('Check your numbers')
    } else {
        //Hide results
        ui.hideResults();

        //show loader
        ui.showLoader(loan);
    }
    
    e.preventDefault();
});

