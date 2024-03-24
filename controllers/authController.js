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

        // Create a new user instance without hashing the password here
        // The password will be hashed in the User model's pre-save hook
        const user = new User({
            name,
            username,
            email,
            password // Store the password as is; hashing is handled by the model
        });

        await user.save(); // The password will be hashed by the pre-save hook
        res.status(201).send("User registered successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        /*for testing purposes: Log the usernameOrEmail being attempted*/

        /* console.log({ usernameOrEmail }); */

        // Find the user by either username or email
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        /*for testing purposes: Log whether a user was found*/
        /* console.log({ userFound: !!user }); */

        if (!user) {
            return res.status(401).send("User not found. Please check your login details and try again.");
        }

        // Assuming `user.password` is the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        /* For testing purposes */
        /* Log whether the password matches */
        /* console.log({ isMatch }); */

        if (!isMatch) {
            return res.status(401).send("Authentication failed. Please check your login details and try again.");
        }

        // If user is found and password is correct, create a token
        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } // Token expires in 24 hours
        );

        // Set the HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'strict', // CSRF protection
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });


        // Logging for testing purposes
        console.log(`User logged in: ${user.username} (${user.email}). Token: ${token}`);


        // Send the token to the client in response body (for storing in localStorage)
        res.status(200).send({
            message: "User logged in successfully.",
            token: token
        });
    } catch (error) {
        console.error("Login error:", error); // Log any error that occurred during the process
        res.status(500).send("An error occurred during the login process.");
    }
};


exports.logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).send({ message: "User logged out successfully." });
    console.log("authController: User logged out successfully.");
};