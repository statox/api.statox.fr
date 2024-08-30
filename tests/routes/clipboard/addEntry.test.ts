import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../../src/app';
import { th } from '../../helpers';

describe('clipboard/addEntry', () => {
    // TODO Have a proper s3 mock so that we can test that the transaction
    // is rolled back when call to s3 fails. Too lazy to do for now
    describe('should reject', () => {
        it('Query with no file and no content', async () => {
            await request(app)
                .post('/clipboard/addEntry')
                .set('Accept', 'application/json')
                .send({ name: 'A cool entry' })
                .expect(400)
                .then((response) => {
                    expect(response.text).to.equal('{"message":"FILE_OR_CONTENT_REQUIRED"}');
                });
        });

        it('Query with duplicate entry (no file)', async () => {
            await th.mysql.fixture({
                Clipboard: [
                    {
                        id: 1,
                        name: 'A cool entry',
                        content: 'Look at that content',
                        creationDateUnix: 10,
                        ttl: 100,
                        linkId: 'aabbccdd'
                    }
                ]
            });

            await request(app)
                .post('/clipboard/addEntry')
                .set('Accept', 'application/json')
                .send({
                    name: 'A cool entry',
                    content: 'Foo'
                })
                .expect(400)
                .then((response) => {
                    expect(response.text).to.equal('{"message":"ITEM_ALREADY_EXISTS"}');
                });

            await th.mysql.checkContains({
                Clipboard: [
                    {
                        name: 'A cool entry',
                        content: 'Look at that content',
                        creationDateUnix: 10
                    }
                ]
            });

            th.s3.checkCall({ nbCalls: 0 });
            await th.mysql.checkTableLength('S3Files', 0);
        });

        it('Query with duplicate entry (file) - should not call S3', async () => {
            const buffer = Buffer.from('some data');
            await th.mysql.fixture({
                Clipboard: [
                    {
                        id: 1,
                        name: 'A cool entry',
                        content: 'Look at that content',
                        creationDateUnix: 10,
                        ttl: 100,
                        linkId: 'aabbccdd'
                    }
                ]
            });

            await request(app)
                .post('/clipboard/addEntry')
                .set('content-type', 'multipart/form-data')
                .field('name', 'A cool entry')
                .field('content', 'entry content')
                .attach('file', buffer)
                .expect(400)
                .then((response) => {
                    expect(response.text).to.equal('{"message":"ITEM_ALREADY_EXISTS"}');
                });

            await th.mysql.checkContains({
                Clipboard: [
                    {
                        name: 'A cool entry',
                        content: 'Look at that content',
                        creationDateUnix: 10
                    }
                ]
            });

            th.s3.checkCall({ nbCalls: 0 });
            await th.mysql.checkTableLength('S3Files', 0);
        });
    });

    describe('should successfully create a new entry', () => {
        it('private entry - default ttl is set to 5 minutes', async () => {
            await request(app)
                .post('/clipboard/addEntry')
                .set('Accept', 'application/json')
                .send({
                    name: 'A cool entry',
                    content: 'Look at that content'
                })
                .expect(200);

            await th.mysql.checkContains({
                Clipboard: [
                    {
                        name: 'A cool entry',
                        content: 'Look at that content',
                        ttl: 60 * 5,
                        isPublic: 0,
                        s3Key: null,
                        creationDateUnix: th.mysql.aroundNowSec
                    }
                ]
            });

            th.s3.checkCall({ nbCalls: 0 });
            await th.mysql.checkTableLength('S3Files', 0);
        });

        it('public entry - with custom ttl', async () => {
            await request(app)
                .post('/clipboard/addEntry')
                .set('Accept', 'application/json')
                .send({
                    name: 'A cool entry',
                    content: 'Look at that content',
                    ttlSeconds: 60,
                    isPublic: true
                })
                .expect(200);

            await th.mysql.checkContains({
                Clipboard: [
                    {
                        name: 'A cool entry',
                        content: 'Look at that content',
                        ttl: 60,
                        isPublic: 1,
                        s3Key: null,
                        creationDateUnix: th.mysql.aroundNowSec
                    }
                ]
            });

            th.s3.checkCall({ nbCalls: 0 });
            await th.mysql.checkTableLength('S3Files', 0);
        });

        it('file entry - file is uploaded to S3', async () => {
            const buffer = Buffer.from('some data');

            await request(app)
                .post('/clipboard/addEntry')
                .set('content-type', 'multipart/form-data')
                .field('name', 'entry name')
                .attach('file', buffer)
                .expect(200);

            th.s3.checkCall({ nbCalls: 1 });
            th.s3.checkCall({
                commandType: 'PutObject',
                input: {
                    Bucket: 'clipboard',
                    ContentType: 'application/octet-stream'
                }
            });
            await th.mysql.checkTableLength('S3Files', 1);

            await th.mysql.checkContains({
                Clipboard: [
                    {
                        name: 'entry name',
                        s3Key: (value: string) => value.match(/.*entry name/) !== null
                    }
                ],
                S3Files: [
                    {
                        bucket: 'clipboard',
                        s3Key: (value: string) => value.match(/.*entry name/) !== null,
                        creationDateUnix: th.mysql.aroundNowSec
                    }
                ]
            });
        });

        it('file entry (no additional content) - file is uploaded to S3', async () => {
            const buffer = Buffer.from('some data');

            await request(app)
                .post('/clipboard/addEntry')
                .set('content-type', 'multipart/form-data')
                .field('name', 'entry name')
                .field('content', 'entry content')
                .attach('file', buffer)
                .expect(200);

            th.s3.checkCall({ nbCalls: 1 });
            th.s3.checkCall({
                commandType: 'PutObject',
                input: {
                    Bucket: 'clipboard',
                    ContentType: 'application/octet-stream'
                }
            });
            await th.mysql.checkTableLength('S3Files', 1);

            await th.mysql.checkContains({
                Clipboard: [
                    {
                        name: 'entry name',
                        s3Key: (value: string) => value.match(/.*entry name/) !== null
                    }
                ],
                S3Files: [
                    {
                        bucket: 'clipboard',
                        s3Key: (value: string) => value.match(/.*entry name/) !== null,
                        creationDateUnix: th.mysql.aroundNowSec
                    }
                ]
            });
        });
    });

    describe('should set an extension based on the file type', () => {
        it('png', async () => {
            await request(app)
                .post('/clipboard/addEntry')
                .set('content-type', 'multipart/form-data')
                .field('name', 'image')
                .field('content', 'image')
                .attach('file', 'tests/assets/glider.png')
                .expect(200);

            th.s3.checkCall({ nbCalls: 1 });
            th.s3.checkCall({
                commandType: 'PutObject',
                input: { Bucket: 'clipboard', ContentType: 'image/png' }
            });
            await th.mysql.checkTableLength('S3Files', 1);

            await th.mysql.checkContains({
                Clipboard: [
                    {
                        name: 'image',
                        s3Key: (value: string) => value.match(/.*image.png/) !== null
                    }
                ],
                S3Files: [
                    {
                        bucket: 'clipboard',
                        s3Key: (value: string) => value.match(/.*image.png/) !== null,
                        creationDateUnix: th.mysql.aroundNowSec
                    }
                ]
            });
        });

        it('gif', async () => {
            await request(app)
                .post('/clipboard/addEntry')
                .set('content-type', 'multipart/form-data')
                .field('name', 'animated_image')
                .field('content', 'animated_image')
                .attach('file', 'tests/assets/burns.gif')
                .expect(200);

            th.s3.checkCall({ nbCalls: 1 });
            th.s3.checkCall({
                commandType: 'PutObject',
                input: { Bucket: 'clipboard', ContentType: 'image/gif' }
            });
            await th.mysql.checkTableLength('S3Files', 1);

            await th.mysql.checkContains({
                Clipboard: [
                    {
                        name: 'animated_image',
                        s3Key: (value: string) => value.match(/.*animated_image.gif/) !== null
                    }
                ],
                S3Files: [
                    {
                        bucket: 'clipboard',
                        s3Key: (value: string) => value.match(/.*animated_image.gif/) !== null,
                        creationDateUnix: th.mysql.aroundNowSec
                    }
                ]
            });
        });
    });
});
