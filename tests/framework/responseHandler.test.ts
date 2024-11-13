import request from 'supertest';
import { assert } from 'chai';
import { app } from '../../src/app';

describe('route handler', () => {
    it('should be executed and affect the response if it exists', async () => {
        await request(app)
            .get('/getroutewithcustomoutputhandler')
            .expect(599)
            .then((response) => {
                assert.equal(response.get('Foo'), 'bar');
            });
    });
});
