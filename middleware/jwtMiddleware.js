// middleware/jwtMiddleware.js
const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(403).send("A token is required for authentication.");
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token to the request
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

module.exports = jwtMiddleware;
