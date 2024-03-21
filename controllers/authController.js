// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match.");
        }

        const userExists = await User.findOne({ $or: [{ username }, { email }] });

        if (userExists) {
            return res.status(400).send("Username or email already exists.");
        }

        // Hashing the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            username,
            email,
            password: hashedPassword // Storing the hashed password
        });

        await user.save();
        res.status(201).send("User registered successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        console.log({ usernameOrEmail }); // Log the usernameOrEmail being attempted

        // Find the user by either username or email
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        console.log({ userFound: !!user }); // Log whether a user was found

        if (!user) {
            return res.status(401).send("User not found. Please check your login details and try again.");
        }

        // Assuming `user.password` is the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log({ isMatch }); // Log whether the password matches

        if (!isMatch) {
            return res.status(401).send("Authentication failed. Please check your login details and try again.");
        }

        // If user is found and password is correct, create a token
        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } // Token expires in 24 hours
        );

        // Send the token to the client
        res.send({
            message: "User logged in successfully.",
            token: token
        });
    } catch (error) {
        console.error("Login error:", error); // Log any error that occurred during the process
        res.status(500).send("An error occurred during the login process.");
    }
};
