//public/js/script.js

/* Registration submit --------------------------------------------------------------------------------------------------*/

document.getElementById('register-button').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default form submission
    var username = document.getElementById('register-username').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    var confirmPassword = document.getElementById('register-confirm-password').value;


    // Clear previous messages
    document.getElementById('register-message').textContent = '';


    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed. Please try again.'); // Adjust error message as needed
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Process the response data
            // Display a success message
            document.getElementById('register-message').textContent = 'Registration successful! Redirecting to homepage...';
            // Optionally, redirect to the login page or home page after a delay
            setTimeout(() => {
                window.location.href = '/'; // redirect to homepage
            }, 3000); // delay (to read the message)
        })
        .catch((error) => {
            console.error('Error:', error);
            // Show an error message
            document.getElementById('register-message').textContent = error.message;
        });
});

/* Login click--------------------------------------------------------------------------------------------------*/
document.getElementById('login-button').addEventListener('click', function(event) {
    event.preventDefault();

    const usernameOrEmail = document.getElementById('login-username-or-email').value;
    const password = document.getElementById('login-password').value;

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed'); // or more specific error based on response status
            }

            return response.json();
        })
        .then(data => {
            if (data.token) {
                console.log(data.message); // Log the login success message
                window.location.href = '/'; // redirect to homepage
            } else {
                alert('Login failed: No token received');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error.message);
        });
});


/*Logout click-----------------------------------------------------------------------*/
