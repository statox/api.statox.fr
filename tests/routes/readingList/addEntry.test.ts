import request from 'supertest';
import { assert } from 'chai';
import { app } from '../../../src/app';
import { aroundNowSec, mysqlCheckContains } from '../../helpers/mysql';
import { s3CheckCall } from '../../helpers/s3';

describe('readingList/addEntry', () => {
    // TODO Add other possible cases
    it('should create new entry and upload the file to S3', async () => {
        await request(app)
            .post('/readingList/addEntry')
            .set('content-type', 'multipart/form-data')
            .field('name', 'entry name')
            .field('commaSeparatedTags', 'tag1,tag2')
            .field('comment', 'An interesting comment')
            .field('link', 'http://foo.com/bar')
            .attach('file', 'tests/assets/glider.png')
            .expect(200);

        s3CheckCall({ nbCalls: 1 });
        s3CheckCall({
            commandType: 'PutObject',
            input: {
                Bucket: 'reading-list',
                ContentType: 'image/png'
            }
        });

        await mysqlCheckContains({
            ReadingList: [
                {
                    creationDateUnix: aroundNowSec,
                    name: 'entry name',
                    comment: 'An interesting comment',
                    link: 'http://foo.com/bar',
                    s3Key: (value: string) => value.match(/.*entry name/) !== null,
                    tags: (value: string) => {
                        const parsedTags = JSON.parse(value);
                        assert.deepEqual(parsedTags, ['tag1', 'tag2']);
                        return true;
                    }
                }
            ],
            S3Files: [
                {
                    bucket: 'reading-list',
                    s3Key: (value: string) => value.match(/.*entry name/) !== null,
                    creationDateUnix: aroundNowSec
                }
            ]
        });
    });
});
