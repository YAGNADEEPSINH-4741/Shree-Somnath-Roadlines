// This file contains JavaScript code for the Shree Shomnath Roadlines webpage.

// Function to validate the contact form
function validateContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return false;
    }
    return true;
}

// Event listener for the contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    if (!validateContactForm()) {
        event.preventDefault();
    }
});

// Function to load dynamic content (example)
function loadServices() {
    const servicesContainer = document.getElementById('services');
    const services = ['Transport', 'Logistics', 'Warehousing'];

    services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service';
        serviceElement.textContent = service;
        servicesContainer.appendChild(serviceElement);
    });
}

// Load services on page load
window.onload = function() {
    loadServices();
};

// Update the form submission handler
document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const submitButton = this.querySelector('.submit-btn');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        const formData = new FormData(this);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = 'thankyou.html';
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Error submitting form. Please try again.');
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});