// controllers/userSettingsController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming your model file is named User.js

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
