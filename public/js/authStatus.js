// public/js/authStatus.js


/*Handling thw user session status---------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    fetch('/auth/session-status', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Session status:', data); //for testing purposes
            const logoutButton = document.getElementById('logout-button');
            const authButton = document.getElementById('auth-button');
            if (data.isLoggedIn) { //If user is logged in:
                logoutButton.style.display = 'block'; // Show logout button
                authButton.style.display = 'none'; // Hide auth button
            } else {
                authButton.style.display = 'block'; // Show auth button
                logoutButton.style.display = 'none'; // Hide logout button

            }
            console.log("isLoggedIn: ", data.isLoggedIn);
        })
        .catch(error => {
            console.error('Error fetching session status:', error);
        });
});


/*Logout--------------------------------------------------------------------------------------------*/
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
