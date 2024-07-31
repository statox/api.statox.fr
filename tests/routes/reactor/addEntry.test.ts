import request from 'supertest';
import { assert } from 'chai';
import { app } from '../../../src/app';
import { mysqlCheckContains, mysqlFixture } from '../../helpers/mysql';
import { s3CheckCall } from '../../helpers/s3';

describe('reactor/addEntry', () => {
    it('should fail on duplicate entry', async () => {
        await mysqlFixture({
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

        await mysqlCheckContains({
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

        s3CheckCall({ nbCalls: 0 });
    });

    it('should create new entry and upload the file to S3', async () => {
        await request(app)
            .post('/reactor/addEntry')
            .set('content-type', 'multipart/form-data')
            .field('name', 'entry name')
            .field('commaSeparatedTags', 'tag1,tag2')
            .attach('file', 'tests/assets/glider.png')
            .expect(200);

        s3CheckCall({ nbCalls: 1 });
        s3CheckCall({
            commandType: 'PutObject',
            input: {
                Bucket: 'reactor',
                ContentType: 'image/png'
            }
        });

        await mysqlCheckContains({
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
                    creationDateUnix: { aroundTimestamp: 'NOW()', precision: '1 SECOND' }
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

        s3CheckCall({ nbCalls: 1 });
        s3CheckCall({
            commandType: 'PutObject',
            input: {
                Bucket: 'reactor',
                ContentType: 'image/png'
            }
        });

        await mysqlCheckContains({
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
                    creationDateUnix: { aroundTimestamp: 'NOW()', precision: '1 SECOND' }
                }
            ]
        });
    });
});
