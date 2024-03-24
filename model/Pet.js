const mongoose = require('mongoose')

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
      enum: ["cat", "dog", "parrot", "fish", "insect", "other pet"],
      index: true,
    },

    breed: String,

    age: {
      type: String,
      required: true,
      index: true,
    },

    color: {
      type: String,
      index: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown",
    },

    description: String,

    photos: {
      type: [String],
      default: [null],
    },

    adoptionStatus: {
      type: String,
      enum: ["available", "pending", "adopted"],
      default: "available",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    created_at: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
  },
  { timestamps: true }
);

petSchema.index({ species: "text", color: "text" });
  
const Pet = mongoose.model('Pet', petSchema)
    
module.exports = Pet