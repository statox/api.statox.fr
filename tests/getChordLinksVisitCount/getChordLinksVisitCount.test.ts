import request from 'supertest';
import { expect } from 'chai';
import { app } from '../..';
import { mysqlFixture } from '../helpers';

describe('getChordLinksVisitCount', () => {
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

        await mysqlFixture({
            ChordFrequency: data
        });

        request(app)
            .get('/getChordLinksVisitCount')
            .expect(200)
            .then((response) => {
                const sortedData = data.sort((a, b) => b.count - a.count);
                expect(response.body).to.have.deep.ordered.members(sortedData);
            });
    });
});
