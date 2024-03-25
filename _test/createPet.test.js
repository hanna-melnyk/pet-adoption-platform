//_test/createPet.test.js
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server'); //require server.js

describe('createPet endpoint', () => {
    it('successfully creates a pet', async () => {
        // Mock the auth middleware to always provide a user
        jest.mock('../middleware/jwtMiddleware', () => (req, res, next) => {
            req.user = { _id: 'mockUserId' };
            next();
        });

        const petData = {
            name: "Test Pet",
            species: "dogs",
            breed: "Test Breed",
            age: "5",
            color: "brown",
            gender: "male",
            description: "A test pet",
            adoptionStatus: "available",
        };

        const response = await request(app).post('/add-new').send(petData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id'); // Assuming your API responds with the created pet's ID
    });

    // Close the mongoose connection after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Optional: Clear the database before each test
    beforeEach(async () => {
        // Example: Clear the pets collection
        await mongoose.connection.collection('pets').deleteMany({});
    });
});