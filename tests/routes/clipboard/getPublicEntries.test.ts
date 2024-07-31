import request from 'supertest';
import { expect } from 'chai';
import { mysqlFixture, nowSec } from '../../helpers/mysql';
import { app } from '../../../src/app';

describe('clipboard/getPublicEntries', () => {
    it('should retieve only public entries', async () => {
        const publicEntry = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1,
            s3Key: null
        };
        const privateEntry = {
            id: 2,
            name: 'private entry',
            content: 'bar',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'bbbbbbbb',
            isPublic: 0,
            s3Key: null
        };
        await mysqlFixture({
            Clipboard: [publicEntry, privateEntry]
        });

        await request(app)
            .get('/clipboard/getPublicEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                expect(response.body).to.have.same.deep.members([publicEntry]);
            });
    });

    it('should get s3PresignedUrl for entry with s3Key', async () => {
        const entry = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1,
            s3Key: 'foo'
        };
        await mysqlFixture({
            Clipboard: [entry],
            S3Files: [
                {
                    bucket: 'clipboard',
                    s3Key: 'foo',
                    creationDateUnix: nowSec()
                }
            ]
        });

        await request(app)
            .get('/clipboard/getPublicEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                const entry = response.body.pop();
                expect(entry.s3PresignedUrl).to.exist;
            });
    });

    it('should retieve only entries with valid ttl', async () => {
        const ttlOk = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1,
            s3Key: null
        };
        const ttlOver = {
            id: 2,
            name: 'private entry',
            content: 'bar',
            creationDateUnix: nowSec() - 120,
            ttl: 60,
            linkId: 'bbbbbbbb',
            isPublic: 0,
            s3Key: null
        };
        await mysqlFixture({
            Clipboard: [ttlOk, ttlOver]
        });

        await request(app)
            .get('/clipboard/getPublicEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                expect(response.body).to.have.same.deep.members([ttlOk]);
            });
    });
});
