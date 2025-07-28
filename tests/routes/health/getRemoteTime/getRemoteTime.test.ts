import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';

describe('health/getRemoteTime', () => {
    it('should return a timestamp close to now', async () => {
        const response = await request(app).get('/health/getRemoteTime').expect(200);

        th.time.isAroundNowSec(Number(response.body));
    });
});
