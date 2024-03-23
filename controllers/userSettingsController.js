// controllers/userSettingsController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming your model file is named User.js


exports.getUserProfile = async (req, res) => {
    try {
        // Assuming req.user is populated from your authentication middleware (e.g., jwtMiddleware)
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return user information as JSON
        res.json({
            name: user.name,
            userPhoto: user.userPhoto,
            username: user.username,
            roles: user.roles,
            // Include any additional information as needed
            posts: user.posts // 'posts' is a field in  User model
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: "An error occurred while fetching the user profile." });
    }
};



exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming authentication middleware adds user ID to req
        const updates = req.body; // Fields the user wants to update
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Define which fields can be updated
        const updatableFields = ['name', 'username', 'email', 'roles'];
        let updateOccurred = false;

        // Check and update fields if necessary
        updatableFields.forEach(field => {
            if (updates[field] && user[field] !== updates[field]) {
                user[field] = updates[field];
                updateOccurred = true;
            }
        });

        // Handle password updates separately
        if (updates.password && updates.newPassword) {
            const isMatch = await user.validatePassword(updates.password);
            if (!isMatch) {
                return res.status(400).send("Current password is incorrect.");
            }
            user.password = await bcrypt.hash(updates.newPassword, 12);
            updateOccurred = true;
        }

        // Save updates to database if any field was updated
        if (updateOccurred) {
            await user.save();
            res.send("Profile updated successfully.");
        } else {
            res.send("No changes detected.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
    }
};
