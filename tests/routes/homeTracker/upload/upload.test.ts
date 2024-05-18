import request from 'supertest';
import { app } from '../../../../src/app';
import { slogCheckLog } from '../../../helpers/slog';

describe('homeTracker/upload', () => {
    it('Should log the sent value', async () => {
        await request(app)
            .post('/homeTracker/upload')
            .set('Accept', 'application/json')
            .send({
                sensorName: 'foo',
                ts: 1700000000000.23,
                tempCelsius: 23.5
            })
            .expect(200);

        slogCheckLog({
            message: 'Home tracking event',
            sensorName: 'foo',
            ts: 1700000000000,
            tempCelsius: 23.5
        });
    });
});
