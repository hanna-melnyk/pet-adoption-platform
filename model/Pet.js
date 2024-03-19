const mongoose = require('mongoose')
// const moment = require('moment')

const schema = mongoose.Schema

const petSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },

    species: {
      type: String,
      required: true,
      enum: ["cats", "dogs", "parrots", "fish", "insects", "other pets"],
    },

    breed: String,

    age: {
      type: String,
      required: false,
    },

    color: String,

    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown",
    },

    description: String,

    photos: [String],

    adoptionStatus: {
      type: String,
      enum: ["available", "pending", "adopted"],
      default: "available",
    },

    adopter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
    { timestamps: true });
  
const Pet = mongoose.model('Pet', petSchema)
    
module.exports = Pet