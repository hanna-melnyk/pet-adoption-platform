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
const dbUri = dbUriTemplate.replace('<username>', username).replace('<password>', password);




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


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
