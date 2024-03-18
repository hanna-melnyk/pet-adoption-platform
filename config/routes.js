//config/routes.js
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController'); // Adjust the path as necessary

// Define routes
router.get('/', viewController.home);

// Export the router
module.exports = router;
