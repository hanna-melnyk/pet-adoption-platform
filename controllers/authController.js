// controllers/authController.js
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send("User registered successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).send("Authentication failed.");
        }
        // Implement session or token generation logic here
        res.send("User logged in successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
