import request from 'supertest';
import { app } from '../../../../src/app';
import { mysqlCheckContains, mysqlFixture } from '../../../helpers/mysql';
import { assert } from 'chai';

describe('addLinkVisit', () => {
    it('should check input schema', async () => {
        await request(app)
            .post('/chords/addLinkVisit')
            .set('Accept', 'application/json')
            .send({
                foo: 'bar'
            })
            .expect(400);
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

        await mysqlCheckContains({
            ChordFrequency: [
                {
                    url: 'https://bar.com',
                    count: 1,
                    lastAccessDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    }
                }
            ]
        });
    });
    it('should update existing entry', async () => {
        await mysqlFixture({
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

        await mysqlCheckContains({
            ChordFrequency: [
                {
                    url: 'https://bar.com',
                    count: 3,
                    lastAccessDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    }
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
