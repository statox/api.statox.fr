import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';

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
                        creationDate: 1742128956403,
                        url: 'https://site.com/url',
                        tags: []
                    }
                ]
            })
            .expect(200);

        th.slog.checkLog('app', 'access-log', {
            path: '/chords/updateAll',
            context: {
                nbChords: 1
            }
        });

        th.s3.checkNbCalls({ nbCalls: 1 });
        th.s3.checkCall({
            commandType: 'PutObject',
            input: { Bucket: 'songbook', ContentType: 'application/json' }
        });
    });
});
