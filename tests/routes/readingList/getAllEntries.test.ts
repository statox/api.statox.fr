import request from 'supertest';
import { mysqlFixture } from '../../helpers/mysql';
import { app } from '../../../src/app';
import { assert } from 'chai';

describe('readingList/getAllEntries', () => {
    it('should retieve all entries', async () => {
        const entryFull = {
            id: 1,
            creationDateUnix: 100,
            name: 'Entry 1',
            comment: 'Entry 1 comment',
            link: 'http://foo.com/bar',
            s3Key: 'foo',
            tags: '["tag1","tag2"]'
        };
        const entryLinkOnly = {
            id: 2,
            creationDateUnix: 100,
            name: 'Entry 2',
            comment: 'Entry 2 comment',
            link: 'http://foo.com/bar',
            s3Key: null,
            tags: '["tag1"]'
        };
        await mysqlFixture({
            ReadingList: [entryFull, entryLinkOnly],
            S3Files: [
                {
                    bucket: 'reading-list',
                    s3Key: 'foo',
                    creationDateUnix: 100
                }
            ]
        });

        await request(app)
            .get('/readingList/getAllEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                const items = response.body.items;
                assert.equal(items.length, 2);
                const entryFullResponse = items.find((e: { id: number }) => e.id === 1);
                assert.exists(entryFullResponse.s3PresignedUrl);
                assert.notExists(entryFullResponse.s3Key);
                assert.deepEqual(entryFullResponse.tags, ['tag1', 'tag2']);

                const entryLinkOnlyResponse = items.find((e: { id: number }) => e.id === 2);
                assert.notExists(entryLinkOnlyResponse.s3PresignedUrl);
                assert.deepEqual(entryLinkOnlyResponse.tags, ['tag1']);
                assert.notExists(entryLinkOnlyResponse.s3Key);
                assert.equal(entryLinkOnlyResponse.link, 'http://foo.com/bar');
            });
    });
});
