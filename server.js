//server.js

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // will allow to access req.cookies


const port = process.env.PORT || 3000;

// Construct the MongoDB URI
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbUriTemplate = process.env.DB_URI;


// Construct URI for testing
const testUsername = process.env.DB_TEST_USERNAME;
const testPassword = process.env.DB_TEST_PASSWORD;
const dbUriTestTemplate = process.env.DB_URI_TEST;

// Choose the correct MongoDB URI based on NODE_ENV
let dbUri;
if (process.env.NODE_ENV === 'test') {
    const testUsername = process.env.DB_TEST_USERNAME;
    const testPassword = process.env.DB_TEST_PASSWORD;
    const dbUriTestTemplate = process.env.DB_URI_TEST;
    dbUri = dbUriTestTemplate.replace('<username>', testUsername).replace('<password>', testPassword);
} else {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const dbUriTemplate = process.env.DB_URI;
    dbUri = dbUriTemplate.replace('<username>', username).replace('<password>', password);
}


mongoose.connect(dbUri)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose connection event listeners
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('disconnected', () => {
    console.log('MongoDB disconnected! Trying to reconnect...');
    mongoose.connect(dbUri, {
        serverSelectionTimeoutMS: 5000 // Attempts to reconnect for 5 seconds
    }).catch(err => console.error('MongoDB reconnection failed:', err));
});
db.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});


// Middleware for checking DB connection health
app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).send('Database connection is not established.');
    }
    next();
});




// use routes from config
const routes = require('./config/routes');
app.use(routes);

const authRoutes = require('./config/authRoutes');
app.use('/auth', authRoutes); // all of the routes in authRoutes.js go through /auth (for example "/auth/login"


/* check the NODE_ENV environment variable, and if it's not set to 'test', it will start the server.*/

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`)); // updated for tests
}


//app.use(express.static(`${__dirname}/public`));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const petRoutes = require("./config/petRoutes");
app.use('/', petRoutes)



/*Export app from server.js or testing purposes*/

module.exports = app;