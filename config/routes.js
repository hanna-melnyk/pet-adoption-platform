//config/routes.js
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const userSettingsController = require('../controllers/userSettingsController');
const jwtMiddleware = require('../middleware/jwtMiddleware');


// Define routes (endpoints)
router.get('/', viewController.getHome);
router.get('/auth', viewController.getAuthPage);
router.get('/profile',  jwtMiddleware, viewController.getUserProfile);



// Export the router
module.exports = router;
