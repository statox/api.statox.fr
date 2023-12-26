import request from 'supertest';
import { DateTime } from 'luxon';
import { mysqlFixture } from '../../../helpers';
import { app } from '../../../..';
import { expect } from 'chai';

describe('clipboard/getAllEntries', () => {
    it('Should retieve all entries', async () => {
        const publicEntry = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1
        };
        const privateEntry = {
            id: 2,
            name: 'private entry',
            content: 'bar',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
            ttl: 60,
            linkId: 'bbbbbbbb',
            isPublic: 0
        };
        const expiredTTL = {
            id: 3,
            name: 'expired ttl',
            content: 'bar',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()) - 120,
            ttl: 60,
            linkId: 'cccccccc',
            isPublic: 1
        };
        const allEntries = [publicEntry, privateEntry, expiredTTL];
        await mysqlFixture({
            Clipboard: allEntries
        });

        await request(app)
            .get('/clipboard/getAllEntries')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                expect(response.body).to.have.same.deep.members(allEntries);
            });
    });
});
