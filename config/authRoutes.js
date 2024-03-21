// config/authRoutes.js
const express = require('express');
const router = express.Router();


// to import
const authController = require('../controllers/authController');
const userSettingsController = require('../controllers/userSettingsController');
const jwtMiddleware = require('../middleware/jwtMiddleware');



router.post('/register', authController.register);
router.post('/login', authController.login);

// update profile
router.post('/updateProfile', jwtMiddleware, userSettingsController.updateUserProfile);

module.exports = router;