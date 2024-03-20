const pet = require('../model/Pet')

const getAllPets = (req, res) => {
    const search = req.query.search;
    const species = req.query.species;
    const filter = {}
    if (search) {
         filter.$or = [
           { species: { $regex: new RegExp(search, "i") } },
           { color: { $regex: new RegExp(search, "i") } },
         ];
    }

      if (species) {
        filter.species = species;
    }
    
      pet
        .find(filter)
        .then((pets) => {
          res.render("pages/home", { pets });
        })
        .catch((err) => console.log(err));
}

const getAddNewPet = (req, res) => {
    pet
      .find()
      .then((pets) => res.render("pages/addNewPet", { pets }))
      .catch((err) => console.log(err));
}

const createPet = (req, res) => {
  const newPet = new pet(req.body);
  newPet
    .save()
    .then(() => res.redirect("/home"))
    .catch((err) => console.log(err));
};

const getFullPetCard = (req, res) => {
    pet.findById(req.params.id)
        .then((result) => res.render('pages/fullPetCards', { pet: result }))
    .catch(err => console.log(err))
}

const deletePet = (req, res) => {
    pet.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/home'))
    .catch(err => console.log(err))
}

const getUpdatePet = (req, res) => {
    pet.findById(req.params.id)
        .then((result) => res.render('pages/editPetCard', { pet: result }))
    .catch(err => console.log(err))
}

const editPetCard = (req, res) => {
    pet.findByIdAndUpdate(req.params.id, req.body)
        .then((petId) => res.redirect(`/home/fullPetCards/${petId._id}`))
    .catch(err => console.log(err))
}

module.exports = {
  getAllPets,
  getAddNewPet,
  createPet,
  getFullPetCard,
  deletePet,
  getUpdatePet,
  editPetCard,
};