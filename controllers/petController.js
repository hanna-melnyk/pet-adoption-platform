const pet = require('../model/Pet')

const getAllPets = (req, res) => {
    pet.find()
        .then((pets) => {
            res.render('pages/home', { pets })
        })
    .catch((err) => console.log(err))
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

module.exports = {
    getAllPets,
    getAddNewPet,
    createPet,
}