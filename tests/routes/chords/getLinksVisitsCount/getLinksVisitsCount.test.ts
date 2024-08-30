import request from 'supertest';
import { app } from '../../../../src/app';
import { assert } from 'chai';
import { th } from '../../../helpers';

describe('chords/getLinksVisitsCount', () => {
    it('should return the visit counts ordered by descending order', async () => {
        const data = [
            {
                url: 'foo',
                count: 1,
                lastAccessDateUnix: 1
            },
            {
                url: 'baz',
                count: 4,
                lastAccessDateUnix: 1
            },
            {
                url: 'bar',
                count: 2,
                lastAccessDateUnix: 2
            }
        ];

        await th.mysql.fixture({
            ChordFrequency: data
        });

        await request(app)
            .get('/chords/getLinksVisitsCount')
            .expect(200)
            .then((response) => {
                const sortedData = data.sort((a, b) => b.count - a.count);
                assert.deepEqual(response.body, sortedData);
            });
    });
});
