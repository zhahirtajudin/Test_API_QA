import supertest from 'supertest';
import express from 'express';
import {expect} from 'chai';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.post('https://api.restful-api.dev', (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body });
});

describe('POST /objects', function() {
    it('responds with json', async function() {
        const postData = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                'Hard disk size':"1 TB"
            }
        };

        const response = await supertest(app)
            .post('/objects')
            .send(postData) // Make sure to send a JSON body
            console.log(response);
            // Assertion
            expect(200, {message: 'Success', postData});
    });
});

// Run the tests using a test runner like Mocha