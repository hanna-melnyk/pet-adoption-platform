//services/petPostService.js

// Contain the core business logic of application.
// Services are called by controllers to perform operations that are
// more complex than simple CRUD (Create, Read, Update, Delete) interactions with models

//petPostService.js contains functions related to pet operations


const Pet = require('../models/Pet');
const User = require('../models/User');

// Service to create a pet listing and associate it with a user ("this list is made by user x")
const createPetListing = async (userId, petData) => {
    // Create the Pet document
    const petPost = await Pet.create({
        ...petData,
        owner: userId, // Set the owner field to the user's ID
    });

    // Associate the Pet document's ID with the user's petPosts
    await User.findByIdAndUpdate(userId, {
        $push: { petPosts: petPost._id }
    });

    return petPost;
};

module.exports = { createPetListing };
