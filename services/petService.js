/* /services/petService.js */

// In a new file, e.g., petService.js
const pet = require('../models/Pet');

const findPets = async (filters) => {
    try {
        const filter = {};

        if (filters.search) {
            filter.$or = [
                { species: { $regex: new RegExp(filters.search, "i") } },
                { color: { $regex: new RegExp(filters.search, "i") } },
            ];
        }

        if (filters.species) {
            filter.species = filters.species;
        }

        return await pet.find(filter).sort({ created_at: -1 });
    } catch (err) {
        throw err; // Or handle it as you see fit
    }
};

module.exports = { findPets };


