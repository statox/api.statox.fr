import request from 'supertest';
import { app } from '../../../../src/app';
import { s3CheckCall } from '../../../helpers/s3';
import { s3Mock } from '../../../../src/services/s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { sdkStreamMixin } from '@smithy/util-stream';
import { Readable } from 'stream';

describe('chords/addEntry', () => {
    it('should work', async () => {
        const stream = new Readable();
        stream.push('[]');
        stream.push(null);

        s3Mock.on(GetObjectCommand).resolves({
            Body: sdkStreamMixin(stream)
        });

        await request(app)
            .post('/chords/addEntry')
            .set('Accept', 'application/json')
            .send({
                artist: 'a cool artist',
                title: 'a cool title',
                url: 'https://site.com/url'
            })
            .expect(200);

        s3CheckCall({ nbCalls: 2 });
        s3CheckCall({
            commandType: 'PutObject',
            input: { Bucket: 'songbook', ContentType: 'application/json' }
        });
    });
});
