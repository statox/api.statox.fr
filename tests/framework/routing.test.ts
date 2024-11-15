import request from 'supertest';
import { app } from '../../src/app.js';

describe('Endpoint routing', () => {
    it('should accept a call with the correct verb', async () => {
        await request(app).get('/getRoute').expect(200);
    });

    it('should reject calls using an incorrect verb for an existing endpoint with a 404 code', async () => {
        await request(app).post('/getRoute').expect(404);
        await request(app).get('/postRoute').expect(404);
    });

    it('should reject a non existing route with a 404 code', async () => {
        await request(app).get('/doesNotExists').expect(404);
    });
});
