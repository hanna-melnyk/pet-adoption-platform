const express = require("express");
const routes = express.Router();
const petController = require('../controllers/petController')

routes.get('/', petController.getAllPets)
routes.get('/addNewPet', petController.getAddNewPet)
routes.post("/add-new", petController.createPet);
routes.get("/fullPetCards/:id", petController.getFullPetCard);
routes.post("/delete-pet/:id", petController.deletePet);

routes.get("/update-petCard/:id", petController.getUpdatePet);
routes.post("/updatePetCard/:id", petController.editPetCard);


module.exports = routes;