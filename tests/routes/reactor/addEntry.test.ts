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
                assert.equal(response.text, 'ER_DUP_ENTRY');
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

    it('Should create new entry and upload the file to R2', async () => {
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
            ]
        });
    });
});
