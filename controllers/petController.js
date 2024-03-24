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
        .sort({ created_at: -1 })
        .then((result) => {
          res.render("pages/home", { pets: result });
        })
        .catch((err) => console.log(err));
}

const getAddNewPet = (req, res) => {
    pet
      .find()
      .then((result, err) =>
        res.render("pages/addNewPet", { pets: result, err: err })
      )
      .catch((err) => console.log(err));
}

const createPet = (req, res) => {
  try {
    
    const photos = req.files ? req.files.map((file) => file.path) : [];

    const newPet = new pet({
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      color: req.body.color,
      gender: req.body.gender,
      description: req.body.description,
      photos: photos, 
      adoptionStatus: req.body.adoptionStatus,
    });

    newPet
      .save()
      .then(() => res.redirect("/home"))
      .catch((err) => res.render("pages/addNewPet", { err: err.errors }));
  } catch (error) {
    console.error( error);
  }
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
  const updatedData = {
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    age: req.body.age,
    color: req.body.color,
    gender: req.body.gender,
    description: req.body.description,
    adoptionStatus: req.body.adoptionStatus,
  };

  pet.findByIdAndUpdate(req.params.id, updatedData)
        .then(() => res.redirect(`/home/fullPetCards/${req.params.id}`))
    .catch(err => console.log(err))
}

const editPetPhoto = (req, res) => {
  const petId = req.params.id
  console.log(petId)
  const photos = req.files ? req.files.map((file) => file.path) : []
  console.log(req.files)
console.log(photos)
  pet.findByIdAndUpdate(petId, { photos: photos })
    .then(() => { res.redirect(`/home/fullPetCards/${petId}`) })
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
  editPetPhoto,
};