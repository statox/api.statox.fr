import request from 'supertest';
import { app } from '../../../src/app';
import { assert } from 'chai';
import { th } from '../../helpers';

describe('clipboard/getPublicEntries', () => {
    it('should retieve only public entries', async () => {
        const publicEntry = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1,
            s3Key: null
        };
        const privateEntry = {
            id: 2,
            name: 'private entry',
            content: 'bar',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'bbbbbbbb',
            isPublic: 0,
            s3Key: null
        };
        await th.mysql.fixture({
            Clipboard: [publicEntry, privateEntry]
        });

        await request(app)
            .get('/clipboard/getPublicEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, [publicEntry]);
            });
    });

    it('should get s3PresignedUrl for entry with s3Key', async () => {
        const entry = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1,
            s3Key: 'foo'
        };
        await th.mysql.fixture({
            Clipboard: [entry],
            S3Files: [
                {
                    bucket: 'clipboard',
                    s3Key: 'foo',
                    creationDateUnix: th.mysql.nowSec()
                }
            ]
        });

        await request(app)
            .get('/clipboard/getPublicEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                const entry = response.body.pop();
                assert.exists(entry.s3PresignedUrl);
            });
    });

    it('should retieve only entries with valid ttl', async () => {
        const ttlOk = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1,
            s3Key: null
        };
        const ttlOver = {
            id: 2,
            name: 'private entry',
            content: 'bar',
            creationDateUnix: th.mysql.nowSec() - 120,
            ttl: 60,
            linkId: 'bbbbbbbb',
            isPublic: 0,
            s3Key: null
        };
        await th.mysql.fixture({
            Clipboard: [ttlOk, ttlOver]
        });

        await request(app)
            .get('/clipboard/getPublicEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, [ttlOk]);
            });
    });
});
