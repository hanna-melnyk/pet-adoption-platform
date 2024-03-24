//public/js/profile.js


document.addEventListener('DOMContentLoaded', () => {
    fetch('/profile', {
        method: 'GET',
        credentials: 'include' // Ensures cookies are included with the request
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not fetch user profile. Make sure you are logged in.');
            }
            return response.json();
        })
        .then(data => {
            // Update the page with user profile data
            document.querySelector('.profile-photo').src = data.userPhoto || 'path/to/default/image';
            document.querySelector('.profile-container h1').textContent = data.name;
            document.querySelector('.profile-container h2').textContent = '@' + data.username;

            const rolesList = document.getElementById('roles-list');
            data.roles.forEach(role => {
                const li = document.createElement('li');
                li.textContent = role;
                rolesList.appendChild(li);
            });

            const postsContainer = document.querySelector('.posts');
            if (data.posts && data.posts.length) {
                data.posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    // Construct post element content here
                    postsContainer.appendChild(postElement);
                });
            } else {
                postsContainer.innerHTML = '<p>No posts to display.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching profile:', error); // Temporary code for testing purposes
            // Display an error message and optionally redirect to the login page
            alert('Error fetching profile. Please try again later.');
        });
});
