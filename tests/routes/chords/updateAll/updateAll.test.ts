import request from 'supertest';
import { app } from '../../../../src/app.js';
import { s3CheckCall } from '../../../helpers/s3/index.js';
import { slogCheckLog } from '../../../helpers/slog/index.js';

describe('chords/updateAll', () => {
    it('should work', async () => {
        await request(app)
            .post('/chords/updateAll')
            .set('Accept', 'application/json')
            .send({
                chords: [
                    {
                        artist: 'a cool artist',
                        title: 'a cool title',
                        creationDate: 123,
                        url: 'https://site.com/url',
                        tags: []
                    }
                ]
            })
            .expect(200);

        slogCheckLog({ message: 'Updating chords', nbChords: 1 });
        s3CheckCall({ nbCalls: 1 });
        s3CheckCall({
            commandType: 'PutObject',
            input: { Bucket: 'songbook', ContentType: 'application/json' }
        });
    });
});
