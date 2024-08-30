import sinon from 'sinon';
import request from 'supertest';
import { app } from '../../../../src/app';
import { assert } from 'chai';
import { th } from '../../../helpers';

describe('chords/addLinkVisit', () => {
    it('should check input schema', async () => {
        await request(app)
            .post('/chords/addLinkVisit')
            .set('Accept', 'application/json')
            .send({
                foo: 'bar'
            })
            .expect(400);

        th.slog.checkLog('middleware', 'Caught error', {
            error: sinon.match((error) => {
                const bodyError = error?.validationErrors?.body[0];
                const isCorrectMessage = bodyError?.message === "must have required property 'url'";

                return isCorrectMessage;
            })
        });
    });

    it('should create new entry with count 1', async () => {
        await request(app)
            .post('/chords/addLinkVisit')
            .set('Accept', 'application/json')
            .send({
                url: 'https://bar.com'
            })
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {});
            });

        await th.mysql.mysqlCheckContains({
            ChordFrequency: [
                {
                    url: 'https://bar.com',
                    count: 1,
                    lastAccessDateUnix: th.mysql.aroundNowSec
                }
            ]
        });
    });
    it('should update existing entry', async () => {
        await th.mysql.mysqlFixture({
            ChordFrequency: [
                {
                    url: 'https://bar.com',
                    count: 2,
                    lastAccessDateUnix: 1
                },
                {
                    url: 'https://foo.com',
                    count: 1,
                    lastAccessDateUnix: 1
                }
            ]
        });

        await request(app)
            .post('/chords/addLinkVisit')
            .set('Accept', 'application/json')
            .send({
                url: 'https://bar.com'
            })
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {});
            });

        await th.mysql.mysqlCheckContains({
            ChordFrequency: [
                {
                    url: 'https://bar.com',
                    count: 3,
                    lastAccessDateUnix: th.mysql.aroundNowSec
                },
                {
                    url: 'https://foo.com',
                    count: 1,
                    lastAccessDateUnix: 1
                }
            ]
        });
    });
});
