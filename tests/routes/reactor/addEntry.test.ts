import request from 'supertest';
import { app } from '../../../src/app';
import { assert } from 'chai';
import { th } from '../../helpers';

describe('reactor/addEntry', () => {
    it('should fail on duplicate entry', async () => {
        await th.mysql.fixture({
            Reactor: [
                {
                    id: 1,
                    name: 'A cool entry',
                    tags: 'tag1,tag2',
                    creationDateUnix: 10,
                    linkId: 'aabbccdd',
                    s3Key: 'aabbccdd_A cool entry'
                }
            ]
        });

        await request(app)
            .post('/reactor/addEntry')
            .set('content-type', 'multipart/form-data')
            .field('name', 'A cool entry')
            .field('commaSeparatedTags', 'tag1,tag2')
            .attach('file', 'tests/assets/glider.png')
            .expect(400)
            .then((response) => {
                assert.equal(response.text, '{"message":"ITEM_ALREADY_EXISTS"}');
            });

        await th.mysql.checkContains({
            Reactor: [
                {
                    name: 'A cool entry',
                    tags: 'tag1,tag2',
                    creationDateUnix: 10,
                    linkId: 'aabbccdd',
                    s3Key: 'aabbccdd_A cool entry'
                }
            ]
        });

        th.s3.checkCall({ nbCalls: 0 });
    });

    it('should create new entry and upload the file to S3', async () => {
        await request(app)
            .post('/reactor/addEntry')
            .set('content-type', 'multipart/form-data')
            .field('name', 'entry name')
            .field('commaSeparatedTags', 'tag1,tag2')
            .attach('file', 'tests/assets/glider.png')
            .expect(200);

        th.s3.checkCall({ nbCalls: 1 });
        th.s3.checkCall({
            commandType: 'PutObject',
            input: {
                Bucket: 'reactor',
                ContentType: 'image/png'
            }
        });

        await th.mysql.checkContains({
            Reactor: [
                {
                    name: 'entry name',
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
                    bucket: 'reactor',
                    s3Key: (value: string) => value.match(/.*entry name/) !== null,
                    creationDateUnix: th.mysql.aroundNowSec
                }
            ]
        });
    });

    it('should create entry with empty tags array if no tags are provided', async () => {
        await request(app)
            .post('/reactor/addEntry')
            .set('content-type', 'multipart/form-data')
            .field('name', 'entry name')
            .field('commaSeparatedTags', '')
            .attach('file', 'tests/assets/glider.png')
            .expect(200);

        th.s3.checkCall({ nbCalls: 1 });
        th.s3.checkCall({
            commandType: 'PutObject',
            input: {
                Bucket: 'reactor',
                ContentType: 'image/png'
            }
        });

        await th.mysql.checkContains({
            Reactor: [
                {
                    name: 'entry name',
                    s3Key: (value: string) => value.match(/.*entry name/) !== null,
                    tags: (value: string) => {
                        assert.equal(value, '[]');
                        return true;
                    }
                }
            ],
            S3Files: [
                {
                    bucket: 'reactor',
                    s3Key: (value: string) => value.match(/.*entry name/) !== null,
                    creationDateUnix: th.mysql.aroundNowSec
                }
            ]
        });
    });
});
