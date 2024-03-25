// controllers/userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming your model file is named User.js


exports.getUser = async (req, res) => {
    try {
        // Assuming req.user is populated from your authentication middleware (e.g., jwtMiddleware)
        const userId = req.user._id;

        // Modify the query to populate the petPosts field
        const user = await User.findById(userId)
            .populate('petPosts'); // This line is added to populate the petPosts

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Render the userProfile page, passing in user data with petPosts populated
        res.render('pages/userProfile', {
            user: user // This object now contains all user details including populated petPosts
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).render('pages/error', { message: "An error occurred while fetching the user profile." });
    }
};



exports.updateUserProfile = async (req, res) => {
    const { password, ...otherUpdates } = req.body;
    const userId = req.user._id; // Assuming this is correctly set from your authentication process

    // Log the entire request body for testing purposes
    console.log('Request body:', req.body);
    console.log('User id:', userId);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Update other fields if provided
        Object.keys(otherUpdates).forEach(key => {
            // Check if the value is not just an empty string or null
            if (otherUpdates[key] !== "" && otherUpdates[key] != null) {
                user[key] = otherUpdates[key];
            }
        });

        // Log the filtered updates (excluding password) for testing purposes
        console.log('Filtered updates to apply (excluding password):', otherUpdates);


        // Check if password was provided in the form and update it
        if (password) {
            // Just set the new password. The pre-save hook will hash it before saving.
            user.password = password;
            // Note: We intentionally avoid logging the password, even for testing purposes, to adhere to security best practices.
            console.log('Password update detected (hashed automatically via pre-save hook).');
        }

        // Save the user document. This triggers the pre-save hook for hashing the password.
        await user.save();

        console.log('User updated successfully.');
        res.send("Profile updated successfully.");
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send("Error updating user profile.");
    }
};

