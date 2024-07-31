import request from 'supertest';
import { assert } from 'chai';
import { mysqlFixture } from '../../helpers/mysql';
import { app } from '../../../src/app';
import { slogCheckLog } from '../../helpers/slog';

describe('reactor/getEntriesForPublic', () => {
    it('should retrieve all entries and format the tags and s3key properly', async () => {
        const entry1 = {
            id: 1,
            name: 'entry 1',
            tags: '["tag1","tag2"]',
            creationDateUnix: 10,
            linkId: 'aaaaaaaa',
            s3Key: 'foo'
        };
        const entry2 = {
            id: 2,
            name: 'entry 2',
            tags: '[]',
            creationDateUnix: 50,
            linkId: 'bbbbbbbb',
            s3Key: 'bar'
        };
        await mysqlFixture({
            Reactor: [entry1, entry2],
            S3Files: [
                {
                    bucket: 'reactor',
                    s3Key: 'foo',
                    creationDateUnix: 10
                },
                {
                    bucket: 'reactor',
                    s3Key: 'bar',
                    creationDateUnix: 50
                }
            ]
        });

        await request(app)
            .get('/reactor/getEntriesForPublic')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                assert.lengthOf(response.body, 2);
                const r1 = response.body[0];
                assert.propertyVal(r1, 'name', 'entry 1');
                assert.propertyVal(r1, 'creationDateUnix', 10);
                assert.deepEqual(r1.tags, ['tag1', 'tag2']);
                try {
                    new URL(r1.s3PresignedUrl);
                } catch {
                    assert.fail('entry 1 s3PresignedUrl is not an url');
                }

                const r2 = response.body[1];
                assert.propertyVal(r2, 'name', 'entry 2');
                assert.propertyVal(r2, 'creationDateUnix', 50);
                assert.deepEqual(r2.tags, []);
                try {
                    new URL(r2.s3PresignedUrl);
                } catch {
                    assert.fail('entry 2 s3PresignedUrl is not an url');
                }
            });
    });

    it('should ignore the entries with missing S3File but log the issue', async () => {
        const entry1 = {
            id: 1,
            name: 'entry 1',
            tags: '["tag1","tag2"]',
            creationDateUnix: 10,
            linkId: 'aaaaaaaa',
            s3Key: 'foo'
        };
        const entry2 = {
            id: 2,
            name: 'entry 2',
            tags: '[]',
            creationDateUnix: 50,
            linkId: 'bbbbbbbb',
            s3Key: 'bar'
        };
        await mysqlFixture({
            Reactor: [entry1, entry2],
            S3Files: [
                {
                    bucket: 'reactor',
                    s3Key: 'foo',
                    creationDateUnix: 10
                }
            ]
        });

        await request(app)
            .get('/reactor/getEntriesForPublic')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                assert.lengthOf(response.body, 1);
                const r1 = response.body[0];
                assert.propertyVal(r1, 'name', 'entry 1');
                assert.propertyVal(r1, 'creationDateUnix', 10);
                assert.deepEqual(r1.tags, ['tag1', 'tag2']);
                try {
                    new URL(r1.s3PresignedUrl);
                } catch {
                    assert.fail('entry 1 s3PresignedUrl is not an url');
                }
            });

        slogCheckLog('reactor', 'error while enriching entry', { entryName: 'entry 2' });
    });
});
