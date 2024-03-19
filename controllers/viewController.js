//controllers/viewController.js

// Define the home page route handler
const home = (req, res) => {
    res.render('pages/index', { name: 'Pet Lover' }); // name - the name of the user
};

module.exports = {
    home
}