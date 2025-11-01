import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';

describe('personalTracker/getAll', () => {
    it('Should return all the events logged before', async () => {
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    type: 'weight',
                    value: 800
                },
                {
                    id: 2,
                    eventDateUnix: 1736190000,
                    type: 'weight',
                    value: 1000
                }
            ]
        });

        // Upload a new event in addition to the fixture
        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({
                event: {
                    timestampUTC: 1736189999,
                    type: 'weight',
                    value: 900
                }
            })
            .expect(200);

        const response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .expect(200);

        assert.deepEqual(response.body, {
            events: [
                { eventDateUnix: 1736190000, type: 'weight', value: 1000 },
                { eventDateUnix: 1736189999, type: 'weight', value: 900 },
                { eventDateUnix: 1736186137, type: 'weight', value: 800 }
            ]
        });
    });
});
