const express = require("express");
const routes = express.Router();
const petController = require('../controllers/petController')

routes.get('/', petController.getAllPets)
routes.get('/addNewPet', petController.getAddNewPet)
routes.post("/add-new", petController.createPet);


module.exports = routes;