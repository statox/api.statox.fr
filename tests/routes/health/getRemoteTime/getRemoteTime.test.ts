import request from 'supertest';
import { app } from '../../../../src/app';
import { assert } from 'chai';

describe('health/getRemoteTime', () => {
    it('should return a timestamp close to now', async () => {
        const now = Date.now();
        await request(app)
            .get('/health/getRemoteTime')
            .expect(200)
            .then((response) => {
                assert.isTrue(response.body.time > now - 1000);
                assert.isTrue(response.body.time < now + 1000);
            });
    });
});
