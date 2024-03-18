require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Construct the MongoDB URI
const dbUsername = encodeURIComponent(process.env.DB_USERNAME);
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
const dbUri = process.env.DB_URI.replace('<username>', dbUsername).replace('<password>', dbPassword);

mongoose.connect(dbUri)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
