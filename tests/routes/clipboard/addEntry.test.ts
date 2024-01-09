import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../../src/app';
import { mysqlCheckContains, mysqlFixture } from '../../helpers/mysql';
import { s3CheckCall } from '../../helpers/s3';

describe('clipboard/addEntry', () => {
    it('should not create duplicate entry', async () => {
        await mysqlFixture({
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
                expect(response.text).to.equal('ER_DUP_ENTRY');
            });

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'A cool entry',
                    content: 'Look at that content',
                    creationDateUnix: 10
                }
            ]
        });

        s3CheckCall({ nbCalls: 0 });
    });

    it('should create new private entry with default ttl to 5 minutes', async () => {
        await request(app)
            .post('/clipboard/addEntry')
            .set('Accept', 'application/json')
            .send({
                name: 'A cool entry',
                content: 'Look at that content'
            })
            .expect(200);

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'A cool entry',
                    content: 'Look at that content',
                    ttl: 60 * 5,
                    isPublic: 0,
                    s3Key: null,
                    creationDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    }
                }
            ]
        });

        s3CheckCall({ nbCalls: 0 });
    });

    it('should create new public entry with custom ttl', async () => {
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

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'A cool entry',
                    content: 'Look at that content',
                    ttl: 60,
                    isPublic: 1,
                    s3Key: null,
                    creationDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    }
                }
            ]
        });

        s3CheckCall({ nbCalls: 0 });
    });

    it('When a file is provided should create new entry and upload the file to R2', async () => {
        const buffer = Buffer.from('some data');

        await request(app)
            .post('/clipboard/addEntry')
            .set('content-type', 'multipart/form-data')
            .field('name', 'entry name')
            .field('content', 'entry content')
            .attach('file', buffer)
            .expect(200);

        s3CheckCall({
            nbCalls: 1,
            commandType: 'PutObject',
            input: { Bucket: 'clipboard', ContentType: 'application/octet-stream' }
        });

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'entry name',
                    s3Key: (value: string) => value.match(/.*entry name/) !== null
                }
            ]
        });
    });

    describe('When uploading a file should set an extension based on the file type', () => {
        it('- png', async () => {
            await request(app)
                .post('/clipboard/addEntry')
                .set('content-type', 'multipart/form-data')
                .field('name', 'image')
                .field('content', 'image')
                .attach('file', 'tests/assets/glider.png')
                .expect(200);

            s3CheckCall({
                nbCalls: 1,
                commandType: 'PutObject',
                input: { Bucket: 'clipboard', ContentType: 'image/png' }
            });

            await mysqlCheckContains({
                Clipboard: [
                    {
                        name: 'image',
                        s3Key: (value: string) => value.match(/.*image.png/) !== null
                    }
                ]
            });
        });

        it('- gif', async () => {
            await request(app)
                .post('/clipboard/addEntry')
                .set('content-type', 'multipart/form-data')
                .field('name', 'animated_image')
                .field('content', 'animated_image')
                .attach('file', 'tests/assets/burns.gif')
                .expect(200);

            s3CheckCall({
                nbCalls: 1,
                commandType: 'PutObject',
                input: { Bucket: 'clipboard', ContentType: 'image/gif' }
            });

            await mysqlCheckContains({
                Clipboard: [
                    {
                        name: 'animated_image',
                        s3Key: (value: string) => value.match(/.*animated_image.gif/) !== null
                    }
                ]
            });
        });
    });
});
