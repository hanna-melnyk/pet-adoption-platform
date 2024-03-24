// public/js/authStatus.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('/auth/session-status', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Session status:', data); //for testing purposes
            const logoutButton = document.getElementById('logout-button');
            if (data.isLoggedIn) {
                logoutButton.style.display = 'block'; // Show logout button
            } else {
                logoutButton.style.display = 'none'; // Hide logout button
            }
            console.log("isLoggedIn: ", data.isLoggedIn);
        })
        .catch(error => {
            console.error('Error fetching session status:', error);
        });
});

function logout() {
    console.log("authController logout() : Attempting to log out...");
    fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
        .then(() => {
            console.log("redirection to main in authStatus....");
            // After logging out, redirect to the home page or refresh the page
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });
}
