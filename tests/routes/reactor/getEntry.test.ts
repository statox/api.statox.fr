import request from 'supertest';
import { mysqlFixture } from '../../helpers/mysql';
import { app } from '../../../src/app';
import { assert } from 'chai';

describe('r/:linkId', () => {
    it('Should redirect to the s3 presigned url', async () => {
        const entry1 = {
            id: 1,
            name: 'entry 1',
            tags: '["tag1","tag2"]',
            creationDateUnix: 10,
            linkId: 'aaaaaaaa',
            s3Key: 'foo'
        };
        await mysqlFixture({
            Reactor: [entry1]
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
    it('Should TBD for an unknown linkId', async () => {
        await mysqlFixture({
            Reactor: []
        });

        await request(app).get('/r/aaaaaaaa').set('Accept', 'application/json').expect(404);
    });
});
