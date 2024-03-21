//public/js/script.js

/* Registration submit --------------------------------------------------------------------------------------------------*/

document.getElementById('register-button').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default form submission
    var username = document.getElementById('register-username').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    var confirmPassword = document.getElementById('register-confirm-password').value;

    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Process the response data
            // Redirect or show a success message
        })
        .catch((error) => {
            console.error('Error:', error);
            // Show an error message
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
                localStorage.setItem('token', data.token); // Save the token
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


