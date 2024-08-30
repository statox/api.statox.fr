import request from 'supertest';
import { app } from '../../../src/app';
import { assert } from 'chai';
import { th } from '../../helpers';

describe('r/:linkId', () => {
    it('should redirect to the s3 presigned url', async () => {
        const entry1 = {
            id: 1,
            name: 'entry 1',
            tags: '["tag1","tag2"]',
            creationDateUnix: 10,
            linkId: 'aaaaaaaa',
            s3Key: 'foo'
        };
        await th.mysql.fixture({
            Reactor: [entry1],
            S3Files: [
                {
                    bucket: 'reactor',
                    s3Key: 'foo',
                    creationDateUnix: 10
                }
            ]
        });

        await request(app)
            .get('/r/aaaaaaaa')
            .set('Accept', 'application/json')
            .expect(302)
            .then((response) => {
                const location = response.headers['location'];
                const url = new URL(location);
                assert.equal(url.pathname, '/reactor/foo');
                assert.match(url.search, /.*GetObject$/);
            });
    });

    it('should return an error for an unknown linkId', async () => {
        await th.mysql.fixture({
            Reactor: []
        });

        await request(app)
            .get('/r/aaaaaaaa')
            .set('Accept', 'application/json')
            .expect(400)
            .then((response) => {
                assert.equal(response.text, '{"message":"ITEM_NOT_FOUND"}');
            });
    });

    it('should return an error for a linkId without a corresponding S3File', async () => {
        const entry1 = {
            id: 1,
            name: 'entry 1',
            tags: '["tag1","tag2"]',
            creationDateUnix: 10,
            linkId: 'aaaaaaaa',
            s3Key: 'foo'
        };
        await th.mysql.fixture({
            Reactor: [entry1],
            S3Files: []
        });

        await request(app)
            .get('/r/aaaaaaaa')
            .set('Accept', 'application/json')
            .expect(400)
            .then((response) => {
                assert.equal(response.text, '{"message":"ITEM_NOT_FOUND"}');
            });
    });
});
