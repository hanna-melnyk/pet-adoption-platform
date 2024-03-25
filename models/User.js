// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Pet = require('./Pet');

/*User schema-----------------------------------------------------------------------------------------*/
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userPhoto: { type: String }, // URL to the user's photo
    roles: [{ type: String, enum: ['petSeller', 'petParent'] }], // User's role (can have multiple)
    petPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }], // Reference to user pet posts
});


// Pre-save hook to hash password before saving a new user
UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next(); // Proceed to the next middleware or save the document
});

// Method to help validate a user's password
UserSchema.methods.validatePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', UserSchema);

module.exports = User;