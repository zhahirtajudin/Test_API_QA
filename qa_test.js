const supertest = require('supertest');
const {expect} = require('chai');
const chai = require('chai');
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');

chai.use(chaiJsonSchemaAjv);

describe('reqres.in API test', () => {
    it('responds with json', async () => {
        const schema = {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        email: { type: 'string' },
                        first_name: { type: 'string' },
                        last_name: { type: 'string' },
                        avatar: { type: 'string' },
                    },
                    required: ['id', 'email', 'first_name', 'last_name', 'avatar']
                },
                support: {
                    type: 'object',
                    properties: {
                        url: { type: 'string' },
                        text: { type: 'string' }
                    },
                    required: ['url', 'text']
                }
            },
            required: ['data', 'support']
        };

        const response = await supertest("https://reqres.in")
            .get('/api/users/2')
            .set('content-type', 'application/json') // Make sure to send a JSON body
            console.log("status code : " + response.status);
            // Assertion
            // expect(response.status).to.equal(200);
            expect(response.body).to.be.jsonSchema(schema);
            console.log(response.body);
    });
});

// Run the tests using a test runner like Mocha