import _sodium from 'libsodium-wrappers-sumo';
import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { encryptAndPrepareEvent } from '../helpers/index.js';

describe('personalTracker/upload', () => {
    const TEST_PASSWORD = 'test-password-123';

    it('Should ingest an encrypted mood event', async () => {
        const eventData = await encryptAndPrepareEvent(
            {
                type: 'mood',
                data: 7
            },
            TEST_PASSWORD,
            1736186137
        );

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send(eventData)
            .expect(200);

        await th.mysql.checkContains({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    salt: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0,
                    nonce: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0,
                    ciphertext: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0
                }
            ]
        });

        th.slog.checkLog('app', 'access-log', {
            context: {
                eventTS: 1736186137
            }
        });
    });

    it('Should ingest an encrypted weight event', async () => {
        const eventData = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 75.5
            },
            TEST_PASSWORD,
            1736186137
        );

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send(eventData)
            .expect(200);

        await th.mysql.checkContains({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    salt: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0,
                    nonce: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0,
                    ciphertext: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0
                }
            ]
        });

        th.slog.checkLog('app', 'access-log', {
            context: {
                eventTS: 1736186137
            }
        });
    });

    it('Should ingest an encrypted emotionwheel event', async () => {
        const eventData = await encryptAndPrepareEvent(
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
            1736186137
        );

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send(eventData)
            .expect(200);

        await th.mysql.checkContains({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    salt: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0,
                    nonce: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0,
                    ciphertext: (v: Buffer) => Buffer.isBuffer(v) && v.length > 0
                }
            ]
        });

        th.slog.checkLog('app', 'access-log', {
            context: {
                eventTS: 1736186137
            }
        });
    });

    it('Should update an event if same eventDateUnix exists', async () => {
        const firstEvent = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 75.5
            },
            TEST_PASSWORD,
            1736186137
        );

        const sodium = _sodium;
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    salt: Buffer.from(sodium.from_base64(firstEvent.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(firstEvent.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(firstEvent.ciphertextB64))
                }
            ]
        });

        const secondEvent = await encryptAndPrepareEvent(
            {
                type: 'weight',
                data: 76.2
            },
            TEST_PASSWORD,
            1736186137
        );

        await request(app)
            .post('/personalTracker/upload')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send(secondEvent)
            .expect(200);

        await th.mysql.checkContains({
            PersonalTracker: [
                {
                    id: 1,
                    eventDateUnix: 1736186137,
                    salt: Buffer.from(sodium.from_base64(secondEvent.saltB64)),
                    nonce: Buffer.from(sodium.from_base64(secondEvent.nonceB64)),
                    ciphertext: Buffer.from(sodium.from_base64(secondEvent.ciphertextB64))
                }
            ]
        });

        th.slog.checkLog('app', 'access-log', {
            context: {
                eventTS: 1736186137
            }
        });
    });
});
