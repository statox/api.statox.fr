import request from 'supertest';
import { app } from '../../../../src/app';
import { th } from '../../../helpers';

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

        th.slog.checkLog('chords', 'Updating chords', { nbChords: 1 });
        th.s3.checkCall({ nbCalls: 1 });
        th.s3.checkCall({
            commandType: 'PutObject',
            input: { Bucket: 'songbook', ContentType: 'application/json' }
        });
    });
});
