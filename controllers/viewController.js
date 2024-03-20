//controllers/viewController.js

// Define the home page route handler

exports.getHome = (req, res) => {
    res.render('pages/index', { name: 'Pet Lover' }); // name - the name of the user
};


exports.getAuthPage = (req, res) => {
    res.render('pages/auth'); // Make sure you have an auth.ejs file in your views directory
};

