import request from 'supertest';
import { app } from '../../../../src/app';
import { testHelper_S3 } from '../../../helpers/s3';
import { testHelper_Slog } from '../../../helpers/slog';

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

        testHelper_Slog.checkLog('chords', 'Updating chords', { nbChords: 1 });
        testHelper_S3.checkCall({ nbCalls: 1 });
        testHelper_S3.checkCall({
            commandType: 'PutObject',
            input: { Bucket: 'songbook', ContentType: 'application/json' }
        });
    });
});
