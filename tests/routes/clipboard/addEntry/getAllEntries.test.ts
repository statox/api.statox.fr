import request from 'supertest';
import { DateTime } from 'luxon';
import { mysqlFixture } from '../../../helpers';
import { app } from '../../../..';
import { expect } from 'chai';

describe('clipboard/getAllEntries', () => {
    it('Should retieve all entries', async () => {
        const publicEntry = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1,
            s3Key: null
        };
        const privateEntry = {
            id: 2,
            name: 'private entry',
            content: 'bar',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
            ttl: 60,
            linkId: 'bbbbbbbb',
            isPublic: 0,
            s3Key: null
        };
        const expiredTTL = {
            id: 3,
            name: 'expired ttl',
            content: 'bar',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()) - 120,
            ttl: 60,
            linkId: 'cccccccc',
            isPublic: 1,
            s3Key: null
        };
        const publicEntryWithS3 = {
            id: 4,
            name: 'public entry with s3',
            content: 'foo',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
            ttl: 60,
            linkId: 'd',
            isPublic: 1,
            s3Key: 'foo'
        };
        const privateEntryWithS3 = {
            id: 5,
            name: 'private entry with s3',
            content: 'foo',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
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
            Clipboard: allEntries
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
