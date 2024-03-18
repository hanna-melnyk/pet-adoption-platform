//controllers/viewController.js

// Define the home page route handler
const home = (req, res) => {
    res.render('index', { name: 'Pet Lover' }); // name - the name of the user
};