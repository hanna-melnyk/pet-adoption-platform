//controllers/viewController.js

const User = require('../models/User');

const petController = require('./petController');




// Define the home page route handler

exports.getHome = async (req, res, next) => {
    try {
        // Assume getAllPets is an async function that fetches pets data
        const pets = await petController.getAllPets(); // Or however you fetch your pets data
        res.render('index', { pets }); // Make sure 'pets' is passed here
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching pets data");
    }
};


exports.getAuthPage = (req, res) => {
    res.render('pages/auth');
};

exports.getUserEditPage = async (req, res) => {
    try {
        // Assuming you have access to the user ID somehow, e.g., from the session, JWT token, etc.
        const userId = req.user._id; // This line is just an example. Your method of retrieving the user ID may vary.

        // Fetch the user data based on userId. This assumes you have a method to find a user by ID.
        const user = await User.findById(userId);

        if (!user) {
            // Handle the case where the user is not found
            res.status(404).send('User not found');
            return;
        }

        // Pass the user data to the template
        res.render('pages/userEdit', { user: user });
    } catch (error) {
        console.error('Error fetching user for edit page:', error);
        res.status(500).send('Error loading edit page');
    }
};