// config/authRoutes.js
const express = require('express');
const router = express.Router();


// to import

const authController = require('../controllers/authController');
const userSettingsController = require('../controllers/userSettingsController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const sessionController = require('../controllers/sessionController');



router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/logout', authController.logout);

// update profile
router.post('/updateProfile', jwtMiddleware, userSettingsController.updateUserProfile);


// Define the route for checking session status
router.get('/session-status', sessionController.checkSessionStatus);


module.exports = router;