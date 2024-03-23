//controllers/sessionController.js

const jwt = require('jsonwebtoken');

/*Checks the token of the user
* If token is valid sets the isLoggedIn status to true
* Else sets the status to false*/

exports.checkSessionStatus = (req, res) => {
    // Assuming you set a cookie named 'token' upon login
    const token = req.cookies.token;
    console.log("sessionController: checkSessionStatus")
    if (!token) {
        return res.json({ isLoggedIn: false });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        // Token is valid
        res.json({ isLoggedIn: true });
    } catch (error) {
        // Token verification failed
        res.json({ isLoggedIn: false });
    }
};
