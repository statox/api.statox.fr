import request from 'supertest';
import { app } from '../../../../src/app.js';
import { assert } from 'chai';
import { th } from '../../../helpers/index.js';

describe('chords/addLinkVisit', () => {
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

        await th.mysql.checkContains({
            ChordFrequency: [
                {
                    url: 'https://bar.com',
                    count: 1,
                    lastAccessDateUnix: th.mysql.aroundNowSec
                }
            ]
        });

        th.slog.checkLog('app', 'access-log', {
            path: '/chords/addLinkVisit',
            context: {
                visitedUrl: 'https://bar.com'
            }
        });
    });
    it('should update existing entry', async () => {
        await th.mysql.fixture({
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

        await th.mysql.checkContains({
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
