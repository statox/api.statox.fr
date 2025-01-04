import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';

describe('personalTracker/upload', () => {
    it('Should ingest an event', async () => {
        await request(app)
            .post('/personalTracker/upload')
            .set('Accept', 'application/json')
            .send({
                eventType: 'weight',
                eventValue: 800
            })
            .expect(200);

        await th.mysql.checkContains({
            PersonalTracker: [
                {
                    id: 1,
                    type: 'weight',
                    value: 800,
                    eventDateUnix: th.mysql.aroundNowSec
                }
            ]
        });

        th.slog.checkLog('app', 'access-log', {
            context: {
                eventType: 'weight',
                eventValue: 800
            }
        });
    });
});
