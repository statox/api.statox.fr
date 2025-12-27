import _sodium from 'libsodium-wrappers-sumo';
import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';
import { decryptEvent, encryptAndPrepareEvent } from '../helpers/index.js';

describe('personalTracker/getAll', () => {
    const TEST_PASSWORD = 'test-password-123';

    it('Should return all encrypted events and decrypt them correctly', async () => {
        const event1 = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 75.5
            },
            TEST_PASSWORD,
            1736186137
        );

        const event2 = await encryptAndPrepareEvent(
            {
                type: 'mood',
                data: 8
            },
            TEST_PASSWORD,
            1736190000
        );

        const event3 = await encryptAndPrepareEvent(
            {
                type: 'emotionwheel',
                data: {
                    emotions: [
                        {
                            category: 'Happy',
                            subcategory: 'Joyful',
                            emotion: 'Excited',
                            color: '#FFD700'
                        }
                    ]
                }
            },
            TEST_PASSWORD,
            1736189999
        );

        const sodium = _sodium;
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    salt: Buffer.from(sodium.from_base64(event1.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(event1.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(event1.ciphertextB64))
                },
                {
                    id: 2,
                    eventDateUnix: 1736190000,
                    salt: Buffer.from(sodium.from_base64(event2.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(event2.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(event2.ciphertextB64))
                }
            ]
        });

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send(event3)
            .expect(200);

        const response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .expect(200);

        assert.equal(response.body.events.length, 3, 'Should have 3 events');

        assert.deepEqual(
            response.body.events.map((e: { eventDateUnix: number }) => e.eventDateUnix),
            [1736190000, 1736189999, 1736186137],
            'Events should be ordered by eventDateUnix DESC'
        );

        const decryptedEvents = await Promise.all(
            response.body.events.map(
                (cipher: {
                    eventDateUnix: number;
                    saltB64: string;
                    nonceB64: string;
                    ciphertextB64: string;
                }) => decryptEvent(cipher, TEST_PASSWORD)
            )
        );

        assert.deepEqual(decryptedEvents[0], {
            type: 'mood',
            data: 8,
            eventDateUnix: 1736190000
        });

        assert.deepEqual(decryptedEvents[1], {
            type: 'emotionwheel',
            data: {
                emotions: [
                    {
                        category: 'Happy',
                        subcategory: 'Joyful',
                        emotion: 'Excited',
                        color: '#FFD700'
                    }
                ]
            },
            eventDateUnix: 1736189999
        });

        assert.deepEqual(decryptedEvents[2], {
            type: 'weight',
            data: 75.5,
            eventDateUnix: 1736186137
        });
    });

    it('Should return empty array when no events exist', async () => {
        const response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .expect(200);

        assert.deepEqual(response.body, { events: [] });
    });

    it('Should handle end-to-end flow: upload and retrieve with different event types', async () => {
        const weightEvent = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 72.3
            },
            TEST_PASSWORD,
            1736200000
        );

        const moodEvent = await encryptAndPrepareEvent(
            {
                type: 'mood',
                data: 6
            },
            TEST_PASSWORD,
            1736200100
        );

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send(weightEvent)
            .expect(200);

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send(moodEvent)
            .expect(200);

        const response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .expect(200);

        assert.equal(response.body.events.length, 2);

        const decryptedEvents = await Promise.all(
            response.body.events.map(
                (cipher: {
                    eventDateUnix: number;
                    saltB64: string;
                    nonceB64: string;
                    ciphertextB64: string;
                }) => decryptEvent(cipher, TEST_PASSWORD)
            )
        );

        assert.deepEqual(decryptedEvents[0], {
            type: 'mood',
            data: 6,
            eventDateUnix: 1736200100
        });

        assert.deepEqual(decryptedEvents[1], {
            type: 'weight',
            data: 72.3,
            eventDateUnix: 1736200000
        });
    });
});
