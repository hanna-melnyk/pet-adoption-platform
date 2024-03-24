//config/routes.js
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');


// Define routes (endpoints)
router.get('/', viewController.getHome);
router.get('/auth', viewController.getAuthPage);



router.get('/profile',  jwtMiddleware, userController.getUser);



// Export the router
module.exports = router;
