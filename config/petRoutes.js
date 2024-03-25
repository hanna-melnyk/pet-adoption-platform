//config/petRoutes.js

const express = require("express");
const routes = express.Router();
const petController = require('../controllers/petController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const upload = require("../middleware/upload");

// Retrieve all pets
routes.get('/', petController.getAllPets);

// Display form to add a new pet
routes.get('/addNewPet', jwtMiddleware, petController.getAddNewPet);

// Create a new pet with possible photo uploads
routes.post("/newPet", jwtMiddleware, upload.array('photos', 10), petController.createPet);

// Display full details for a single pet
routes.get("/fullPetCards/:id", petController.getFullPetCard);

// Delete a specific pet
routes.post("/delete-pet/:id", petController.deletePet);

// Display form for updating a pet
routes.get("/update-petCard/:id", petController.getUpdatePet);

// Handle updates to a pet, including photo uploads
routes.post("/updatePetCard/:id", jwtMiddleware, upload.array('photos', 10), petController.editPetCard);

module.exports = routes;
