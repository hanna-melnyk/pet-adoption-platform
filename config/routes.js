//config/routes.js
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');


// Define routes (endpoints)
//router.get('/', viewController.getHome);
router.get('/auth', viewController.getAuthPage);


//Middleware to pass the user token
router.get('/profile',  jwtMiddleware, userController.getUser);


router.get('/userEdit', jwtMiddleware, viewController.getUserEditPage);

router.post('/userEdit', jwtMiddleware, (req, res, next) => {
    console.log('POST to /userEdit, req.body:', req.body); // Debug log
    next(); // Pass control to the next handler
}, userController.updateUserProfile);


// Export the router
module.exports = router;
