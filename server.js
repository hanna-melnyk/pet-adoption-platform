require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

// Construct the MongoDB URI
const dbUri = process.env.DB_URI

mongoose.connect(dbUri)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));


// use routes from config
const routes = require('./config/routes');
app.use(routes);

const authRoutes = require('./config/authRoutes');
app.use(authRoutes);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
