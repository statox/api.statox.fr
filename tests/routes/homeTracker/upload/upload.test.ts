import request from 'supertest';
import { app } from '../../../../src/app';
import { slogCheckLog } from '../../../helpers/slog';

describe('homeTracker/upload', () => {
    it('Should log the sent value', async () => {
        await request(app)
            .post('/homeTracker/upload')
            .set('Accept', 'application/json')
            .send({
                value: 12
            })
            .expect(200);

        slogCheckLog({
            message: 'Home tracking event',
            sample: 12
        });
    });
});
