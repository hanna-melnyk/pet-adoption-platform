//controllers/viewController.js

const User = require('../models/User');



// Define the home page route handler

exports.getHome = (req, res) => {
    res.render('pages/index', { name: 'Pet Lover' }); // name - the name of the user
};


exports.getAuthPage = (req, res) => {
    res.render('pages/auth');
