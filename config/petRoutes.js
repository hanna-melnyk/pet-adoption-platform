const express = require("express");
const routes = express.Router();
const petController = require('../controllers/petController')
const upload = require("../middlewares/upload");

routes.get('/', petController.getAllPets)
routes.get('/addNewPet', petController.getAddNewPet)
routes.post("/add-new", upload.array('photos', 10), petController.createPet);
routes.get("/fullPetCards/:id", petController.getFullPetCard);
routes.post("/delete-pet/:id", petController.deletePet);

routes.get("/update-petCard/:id", petController.getUpdatePet);
routes.post("/updatePetCard/:id", petController.editPetCard);
routes.post("/updatePetPhoto/:id", petController.editPetPhoto)




module.exports = routes;