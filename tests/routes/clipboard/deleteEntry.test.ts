import request from 'supertest';
import { app } from '../../../src/app.js';
import { th } from '../../helpers/index.js';

describe('clipboard/deleteEntry', () => {
    it('should delete an existing entry', async () => {
        await th.mysql.fixture({
            Clipboard: [
                {
                    id: 1,
                    name: 'entry 1',
                    content: 'foo',
                    creationDateUnix: 10,
                    ttl: 100,
                    linkId: 'aaaaaaaa'
                },
                {
                    id: 2,
                    name: 'entry 2',
                    content: 'foo',
                    creationDateUnix: 10,
                    ttl: 100,
                    linkId: 'bbbbbbbb'
                }
            ]
        });

        await request(app)
            .post('/clipboard/deleteEntry')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({
                name: 'entry 1'
            })
            .expect(200);

        await th.mysql.checkContains({
            Clipboard: [
                {
                    name: 'entry 2'
                }
            ]
        });

        await th.mysql.checkDoesNotContain({
            Clipboard: [
                {
                    name: 'entry 1'
                }
            ]
        });

        th.s3.checkNbCalls({ nbCalls: 0 });
    });

    it('should delete associated S3 file if it exists', async () => {
        await th.mysql.fixture({
            Clipboard: [
                {
                    id: 1,
                    name: 'entry 1',
                    content: 'foo',
                    creationDateUnix: 10,
                    ttl: 100,
                    linkId: 'aaaaaaaa',
                    s3Key: 'foo.png'
                }
            ],
            S3Files: [
                {
                    bucket: 'clipboard',
                    s3Key: 'foo.png',
                    creationDateUnix: 10
                }
            ]
        });

        await request(app)
            .post('/clipboard/deleteEntry')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({
                name: 'entry 1'
            })
            .expect(200);

        th.s3.checkNbCalls({ nbCalls: 1 });
        th.s3.checkCall({
            commandType: 'DeleteObject',
            input: { Bucket: 'clipboard', Key: 'foo.png' }
        });

        await th.mysql.checkDoesNotContain({
            Clipboard: [
                {
                    name: 'entry 1'
                }
            ]
        });
        await th.mysql.checkContains({
            S3Files: [
                {
                    s3Key: 'foo.png',
                    creationDateUnix: 10,
                    deletionDateUnix: th.mysql.aroundNowSec
                }
            ]
        });
    });
});
