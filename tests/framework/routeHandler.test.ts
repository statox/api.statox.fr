import request from 'supertest';
import { app } from '../../src/app';
import { assert } from 'chai';

describe('route handler', () => {
    it('should pass the result of the route to the response', async () => {
        await request(app)
            .get('/getroutewithresult')
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, { foo: 1 });
            });
    });

    it('should pass an empty object to the response if the route doesnt return a result', async () => {
        await request(app)
            .get('/getRoute')
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {});
            });
    });

    it('should pass the error to the next function if the route throws', async () => {
        await request(app)
            .get('/getroutethatthrows')
            .expect(500)
            .then((response) => {
                assert.deepEqual(response.body, { message: 'Internal Server Error' });
            });
    });
});
