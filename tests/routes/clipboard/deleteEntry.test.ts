import request from 'supertest';
import sinon from 'sinon';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { app } from '../../../src/app';
import { mysqlCheckContains, mysqlCheckDoesNotContain, mysqlFixture } from '../../helpers/mysql';
import { S3 } from '../../../src/services/s3';

describe('clipboard/deleteEntry', () => {
    it('should delete an existing entry', async () => {
        await mysqlFixture({
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
            .set('Accept', 'application/json')
            .send({
                name: 'entry 1'
            })
            .expect(200);

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'entry 2'
                }
            ]
        });

        await mysqlCheckDoesNotContain({
            Clipboard: [
                {
                    name: 'entry 1'
                }
            ]
        });
    });

    it('should delete associated S3 file if it exists', async () => {
        const s3Send = sinon.spy(S3, 'send');
        await mysqlFixture({
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
            ]
        });

        await request(app)
            .post('/clipboard/deleteEntry')
            .set('Accept', 'application/json')
            .send({
                name: 'entry 1'
            })
            .expect(200);

        s3Send.restore();
        sinon.assert.calledOnce(s3Send);
        sinon.assert.calledWithMatch(s3Send, sinon.match.instanceOf(DeleteObjectCommand));
        sinon.assert.calledWithMatch(
            s3Send,
            sinon.match.has('input', sinon.match.has('Bucket', 'clipboard'))
        );
        sinon.assert.calledWithMatch(
            s3Send,
            sinon.match.has('input', sinon.match.has('Key', 'foo.png'))
        );

        await mysqlCheckDoesNotContain({
            Clipboard: [
                {
                    name: 'entry 1'
                }
            ]
        });
    });
});
