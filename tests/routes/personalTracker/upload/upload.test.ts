import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';

describe('personalTracker/upload', () => {
    it('Should ingest an event', async () => {
        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({
                event: {
                    timestampUTC: 1736186137,
                    type: 'weight',
                    value: 800
                }
            })
            .expect(200);

        await th.mysql.checkContains({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    type: 'weight',
                    value: 800
                }
            ]
        });

        th.slog.checkLog('app', 'access-log', {
            context: {
                eventTS: 1736186137,
                eventType: 'weight',
                eventValue: 800
            }
        });
    });

    it('Should update an event value if same type at same TS exists', async () => {
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    type: 'weight',
                    value: 800
                }
            ]
        });

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({
                event: {
                    timestampUTC: 1736186137,
                    type: 'weight',
                    value: 900
                }
            })
            .expect(200);

        await th.mysql.checkContains({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    type: 'weight',
                    value: 900
                }
            ]
        });

        th.slog.checkLog('app', 'access-log', {
            context: {
                eventTS: 1736186137,
                eventType: 'weight',
                eventValue: 900
            }
        });
    });
});
