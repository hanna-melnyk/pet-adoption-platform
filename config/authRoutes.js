// config/authRoutes.js
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');



// to import

const authController = require('../controllers/authController');
const userSettingsController = require('../controllers/userSettingsController');
const jwtMiddleware = require('../middleware/jwtMiddleware');


router.get('/verifyToken', jwtMiddleware, authController.getUserInfo);


router.post('/register', authController.register);
router.post('/login', authController.login);

// update profile
router.post('/updateProfile', jwtMiddleware, userSettingsController.updateUserProfile);


module.exports = router;