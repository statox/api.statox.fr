import _sodium from 'libsodium-wrappers-sumo';
import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';
import { decryptEvent, encryptAndPrepareEvent } from '../helpers/index.js';

describe('personalTracker/getAll', () => {
    const TEST_PASSWORD_USER1 = 'test-password-user1';
    const TEST_PASSWORD_USER2 = 'test-password-user2';
    let user1Id: number;
    let user2Id: number;

    beforeEach(async () => {
        const user1 = await th.auth2.setupAuth2User({
            username: 'user1',
            password: 'password1',
            scopes: ['personalTracker']
        });
        user1Id = user1.userId;

        const user2 = await th.auth2.setupAuth2User({
            username: 'user2',
            password: 'password2',
            scopes: ['personalTracker']
        });
        user2Id = user2.userId;
    });

    it('Should return all encrypted events and decrypt them correctly', async () => {
        const event1 = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 75.5
            },
            TEST_PASSWORD_USER1,
            1736186137
        );

        const event2 = await encryptAndPrepareEvent(
            {
                type: 'mood',
                data: 8
            },
            TEST_PASSWORD_USER1,
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
            TEST_PASSWORD_USER1,
            1736189999
        );

        const sodium = _sodium;
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    id: 1,
                    userId: user1Id,
                    eventDateUnix: 1736186137,
                    salt: Buffer.from(sodium.from_base64(event1.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(event1.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(event1.ciphertextB64))
                },
                {
                    id: 2,
                    userId: user1Id,
                    eventDateUnix: 1736190000,
                    salt: Buffer.from(sodium.from_base64(event2.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(event2.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(event2.ciphertextB64))
                }
            ]
        });

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie('user1'))
            .set('Accept', 'application/json')
            .send(event3)
            .expect(200);

        const response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie('user1'))
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
                }) => decryptEvent(cipher, TEST_PASSWORD_USER1)
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

    it('Should return empty array when no events exist for user', async () => {
        const response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie('user1'))
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
            TEST_PASSWORD_USER1,
            1736200000
        );

        const moodEvent = await encryptAndPrepareEvent(
            {
                type: 'mood',
                data: 6
            },
            TEST_PASSWORD_USER1,
            1736200100
        );

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie('user1'))
            .set('Accept', 'application/json')
            .send(weightEvent)
            .expect(200);

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie('user1'))
            .set('Accept', 'application/json')
            .send(moodEvent)
            .expect(200);

        const response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie('user1'))
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
                }) => decryptEvent(cipher, TEST_PASSWORD_USER1)
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

    it('Should only return events for the authenticated user, not other users', async () => {
        const user1Event1 = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 75.5
            },
            TEST_PASSWORD_USER1,
            1736186137
        );

        const user1Event2 = await encryptAndPrepareEvent(
            {
                type: 'mood',
                data: 7
            },
            TEST_PASSWORD_USER1,
            1736190000
        );

        const user2Event1 = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 80.0
            },
            TEST_PASSWORD_USER2,
            1736186137
        );

        const user2Event2 = await encryptAndPrepareEvent(
            {
                type: 'mood',
                data: 5
            },
            TEST_PASSWORD_USER2,
            1736200000
        );

        const sodium = _sodium;
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    id: 1,
                    userId: user1Id,
                    eventDateUnix: 1736186137,
                    salt: Buffer.from(sodium.from_base64(user1Event1.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(user1Event1.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(user1Event1.ciphertextB64))
                },
                {
                    id: 2,
                    userId: user1Id,
                    eventDateUnix: 1736190000,
                    salt: Buffer.from(sodium.from_base64(user1Event2.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(user1Event2.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(user1Event2.ciphertextB64))
                },
                {
                    id: 3,
                    userId: user2Id,
                    eventDateUnix: 1736186137,
                    salt: Buffer.from(sodium.from_base64(user2Event1.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(user2Event1.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(user2Event1.ciphertextB64))
                },
                {
                    id: 4,
                    userId: user2Id,
                    eventDateUnix: 1736200000,
                    salt: Buffer.from(sodium.from_base64(user2Event2.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(user2Event2.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(user2Event2.ciphertextB64))
                }
            ]
        });

        const user1Response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie('user1'))
            .set('Accept', 'application/json')
            .expect(200);

        assert.equal(user1Response.body.events.length, 2, 'User1 should only see 2 events');

        const user1DecryptedEvents = await Promise.all(
            user1Response.body.events.map(
                (cipher: {
                    eventDateUnix: number;
                    saltB64: string;
                    nonceB64: string;
                    ciphertextB64: string;
                }) => decryptEvent(cipher, TEST_PASSWORD_USER1)
            )
        );

        assert.deepEqual(user1DecryptedEvents[0], {
            type: 'mood',
            data: 7,
            eventDateUnix: 1736190000
        });

        assert.deepEqual(user1DecryptedEvents[1], {
            type: 'weight',
            data: 75.5,
            eventDateUnix: 1736186137
        });

        const user2Response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie('user2'))
            .set('Accept', 'application/json')
            .expect(200);

        assert.equal(user2Response.body.events.length, 2, 'User2 should only see 2 events');

        const user2DecryptedEvents = await Promise.all(
            user2Response.body.events.map(
                (cipher: {
                    eventDateUnix: number;
                    saltB64: string;
                    nonceB64: string;
                    ciphertextB64: string;
                }) => decryptEvent(cipher, TEST_PASSWORD_USER2)
            )
        );

        assert.deepEqual(user2DecryptedEvents[0], {
            type: 'mood',
            data: 5,
            eventDateUnix: 1736200000
        });

        assert.deepEqual(user2DecryptedEvents[1], {
            type: 'weight',
            data: 80.0,
            eventDateUnix: 1736186137
        });
    });

    it('Should verify data isolation: mistakenly attributed data should not be accessible', async () => {
        const user1Event = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 75.5
            },
            TEST_PASSWORD_USER1,
            1736186137
        );

        const mistakenlyAttributedEvent = await encryptAndPrepareEvent(
            {
                type: 'mood',
                data: 9
            },
            TEST_PASSWORD_USER1,
            1736190000
        );

        const sodium = _sodium;
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    id: 1,
                    userId: user1Id,
                    eventDateUnix: 1736186137,
                    salt: Buffer.from(sodium.from_base64(user1Event.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(user1Event.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(user1Event.ciphertextB64))
                },
                {
                    id: 2,
                    userId: user2Id,
                    eventDateUnix: 1736190000,
                    salt: Buffer.from(sodium.from_base64(mistakenlyAttributedEvent.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(mistakenlyAttributedEvent.nonceB64)),
                    ciphertext: Buffer.from(
                        sodium.from_base64(mistakenlyAttributedEvent.ciphertextB64)
                    )
                }
            ]
        });

        const user1Response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie('user1'))
            .set('Accept', 'application/json')
            .expect(200);

        assert.equal(user1Response.body.events.length, 1, 'User1 should only see their own event');

        const user1DecryptedEvents = await Promise.all(
            user1Response.body.events.map(
                (cipher: {
                    eventDateUnix: number;
                    saltB64: string;
                    nonceB64: string;
                    ciphertextB64: string;
                }) => decryptEvent(cipher, TEST_PASSWORD_USER1)
            )
        );

        assert.deepEqual(user1DecryptedEvents[0], {
            type: 'weight',
            data: 75.5,
            eventDateUnix: 1736186137
        });

        const user2Response = await request(app)
            .get('/personalTracker/getAll')
            .set('Cookie', th.auth2.getPassportSessionCookie('user2'))
            .set('Accept', 'application/json')
            .expect(200);

        assert.equal(
            user2Response.body.events.length,
            1,
            'User2 should only see the mistakenly attributed event'
        );

        const user2DecryptedEvents = await Promise.all(
            user2Response.body.events.map(
                (cipher: {
                    eventDateUnix: number;
                    saltB64: string;
                    nonceB64: string;
                    ciphertextB64: string;
                }) => decryptEvent(cipher, TEST_PASSWORD_USER1)
            )
        );

        assert.deepEqual(user2DecryptedEvents[0], {
            type: 'mood',
            data: 9,
            eventDateUnix: 1736190000
        });
    });
});
