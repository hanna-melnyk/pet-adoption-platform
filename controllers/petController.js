//controllers/petController.js

const pet = require('../models/Pet')

const { createPetListing } = require('../services/petPostService');
const { findPets } = require('../services/petService');


const getAllPets = async (req, res) => {
    const search = req.query.search;
    const species = req.query.species;

    try {
        const pets = await findPets({ search, species });
        res.render("pages/index", { pets: pets });
    } catch (err) {
        console.error("Error getting all pets:", err);
        res.status(500).send("Failed to get pets.");
    }
}

const getAddNewPet = (req, res) => {
    pet
      .find()
      .then((result, err) =>
        res.render("pages/addNewPet", { pets: result, err: err })
      )
      .catch((err) => console.log(err));
}

const createPet = async (req, res) => {
    try {
        // Assuming user's ID is stored in req.user._id once they're authenticated
        const userId = req.user._id;
        const petData = {
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            color: req.body.color,
            gender: req.body.gender,
            description: req.body.description,
            // Middleware will handle file uploads
            photos: req.files ? req.files.map(file => file.path) : [],
            adoptionStatus: req.body.adoptionStatus,
        };

        // Call the service to create the pet listing
        const petPost = await createPetListing(userId, petData);
        res.render("pages/success", { message: "Post has been successfully submitted" });
    } catch (error) {
        console.error(error);
        // Render or redirect to the form with an error message
        res.status(500).render("pages/addNewPet", { err: "Failed to create pet. Please try again." });
    }
};

const getFullPetCard = (req, res) => {
    pet.findById(req.params.id)
        .then((result) => res.render('pages/fullPetCards', { pet: result }))
    .catch(err => console.log(err))
}

const deletePet = (req, res) => {
    pet.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/'))
    .catch(err => console.log(err))
}

const getUpdatePet = (req, res) => {
    pet.findById(req.params.id)
        .then((result) => res.render('pages/editPetCard', { pet: result }))
    .catch(err => console.log(err))
}

const editPetCard = async (req, res) => {
    try {
        const petId = req.params.id;
        const petToUpdate = await pet.findById(petId);

        let updatedData = {};

        // Dynamically build updatedData with only changed fields
        Object.keys(req.body).forEach(key => {
            if (key !== "existingPhotos") { // Skip existingPhotos here, handle it separately
                // Check if the field exists, is not empty, and has been changed
                if (req.body[key] && petToUpdate[key] && req.body[key] !== petToUpdate[key].toString()) {
                    updatedData[key] = req.body[key];
                }
            }
        });

        // Handle photo updates
        if (req.files && req.files.length > 0) {
            // If there are new photo uploads, use these
            updatedData.photos = req.files.map(file => file.path);
        } else if (req.body.existingPhotos && !Array.isArray(req.body.existingPhotos)) {
            // If existingPhotos is not empty but comes as a single value (not as an array), put it into an array
            updatedData.photos = [req.body.existingPhotos];
        } else if (req.body.existingPhotos) {
            // If existingPhotos comes as an array, use it directly
            updatedData.photos = req.body.existingPhotos;
        }

        // Check if updatedData is empty (no changes were made, including photo updates)
        if (Object.keys(updatedData).length === 0) {
            // No changes were made, so just redirect without updating
            return res.redirect(`/fullPetCards/${petId}`);
        }

        // Proceed with the update since changes were made
        await pet.findByIdAndUpdate(petId, updatedData);
        res.redirect(`/fullPetCards/${petId}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to update pet.");
    }
};



module.exports = {
  getAllPets,
  getAddNewPet,
  createPet,
  getFullPetCard,
  deletePet,
  getUpdatePet,
  editPetCard
};