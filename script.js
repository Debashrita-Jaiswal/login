document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const message = document.getElementById('message');

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Load existing user data from JSON
        fetch('users.json')
            .then(response => response.json())
            .then(existingUsers => {
                // Check if username already exists
                if (usernameExists(username, existingUsers)) {
                    message.textContent = 'Username already exists. Please choose another.';
                } else {
                    // Create a new user object
                    const newUser = { username, password };
                    
                    // Append the new user to existing users
                    existingUsers.push(newUser);

                    // Save the updated user data back to JSON
                    saveUserToJson(existingUsers);

                    message.textContent = 'Signup successful!';
                }
            });
    });

    function usernameExists(username, users) {
        return users.some(user => user.username === username);
    }

    function saveUserToJson(users) {
        fetch('users.json', {
            method: 'PUT', // Use 'PUT' method to update the JSON file
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(users),
        })
            .then(response => {
                if (response.ok) {
                    console.log('User data updated successfully.');
                } else {
                    console.error('Failed to update user data.');
                }
            });
    }
});
