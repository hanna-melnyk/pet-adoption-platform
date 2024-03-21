//controllers/viewController.js

// Define the home page route handler
exports.getHome = (req, res) => {
    res.render('pages/index', { name: 'Pet Lover' }); // name - the name of the user
};


exports.getAuthPage = (req, res) => {
    res.render('pages/auth'); // Make sure you have an auth.ejs file in your views directory
};


exports.getUserProfile = async (req, res) => {
    try {
        // Example: Fetch the user's data based on their session or a passed identifier
        const userId = req.user._id; // Make sure you have a way to identify the user (e.g., from the session)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Render the userProfile.ejs template located in views/pages with the user data
        res.render('pages/userProfile', { user: user.toObject() });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the user profile.");
    }
};