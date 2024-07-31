import request from 'supertest';
import { assert, expect } from 'chai';
import { mysqlFixture, nowSec } from '../../helpers/mysql';
import { app } from '../../../src/app';

describe('clipboard/getAllEntries', () => {
    describe('Should fail', () => {
        it('if an entry with an s3key does not have a corresponding s3File entry', async () => {
            const publicEntryWithS3 = {
                id: 4,
                name: 'public entry with s3',
                content: 'foo',
                creationDateUnix: nowSec(),
                ttl: 60,
                linkId: 'd',
                isPublic: 1,
                s3Key: 'foo'
            };
            await mysqlFixture({
                Clipboard: [publicEntryWithS3]
            });

            await request(app)
                .get('/clipboard/getAllEntries')
                .set('Accept', 'application/json')
                .expect(400)
                .then((response) => {
                    assert.equal(response.text, '{"message":"ITEM_NOT_FOUND"}');
                });
        });

        it('if we try to retrieve an entry with a deleted s3File', async () => {
            const publicEntryWithS3 = {
                id: 4,
                name: 'public entry with s3',
                content: 'foo',
                creationDateUnix: nowSec(),
                ttl: 60,
                linkId: 'd',
                isPublic: 1,
                s3Key: 'foo'
            };
            await mysqlFixture({
                Clipboard: [publicEntryWithS3],
                S3Files: [
                    {
                        bucket: 'clipboard',
                        s3Key: 'foo',
                        creationDateUnix: 10,
                        deletionDateUnix: 1000
                    }
                ]
            });

            await request(app)
                .get('/clipboard/getAllEntries')
                .set('Accept', 'application/json')
                .expect(500)
                .then((response) => {
                    assert.equal(response.text, '{"message":"Internal Server Error"}');
                });
        });
    });

    it('should retieve all entries', async () => {
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
        const expiredTTL = {
            id: 3,
            name: 'expired ttl',
            content: 'bar',
            creationDateUnix: nowSec() - 120,
            ttl: 60,
            linkId: 'cccccccc',
            isPublic: 1,
            s3Key: null
        };
        const publicEntryWithS3 = {
            id: 4,
            name: 'public entry with s3',
            content: 'foo',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'd',
            isPublic: 1,
            s3Key: 'foo'
        };
        const privateEntryWithS3 = {
            id: 5,
            name: 'private entry with s3',
            content: 'foo',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'e',
            isPublic: 1,
            s3Key: 'bar'
        };
        const allEntries = [
            publicEntry,
            publicEntryWithS3,
            privateEntry,
            expiredTTL,
            privateEntryWithS3
        ];
        await mysqlFixture({
            Clipboard: allEntries,
            S3Files: [
                {
                    bucket: 'clipboard',
                    s3Key: 'bar',
                    creationDateUnix: nowSec()
                },
                {
                    bucket: 'clipboard',
                    s3Key: 'foo',
                    creationDateUnix: nowSec()
                }
            ]
        });

        await request(app)
            .get('/clipboard/getAllEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.length(5);
                expect(response.body).to.include.deep.members([
                    publicEntry,
                    privateEntry,
                    expiredTTL
                ]);

                const publicEntryWithS3Response = response.body.find(
                    (e: { id: number }) => e.id === 4
                );
                expect(publicEntryWithS3Response.s3PresignedUrl).to.exist;

                const privateEntryWithS3Response = response.body.find(
                    (e: { id: number }) => e.id === 4
                );
                expect(privateEntryWithS3Response.s3PresignedUrl).to.exist;
            });
    });
});
