import request from 'supertest';
import { DateTime } from 'luxon';
import { mysqlFixture } from '../../../helpers';
import { app } from '../../../..';
import { expect } from 'chai';

describe('clipboard/view', () => {
    it('Should generate HTML page with only public and non expired entries', async () => {
        const publicEntry = {
            id: 1,
            name: 'public entry',
            content: 'foo',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
            ttl: 60,
            linkId: 'aaaaaaaa',
            isPublic: 1
        };
        const publicEntry2 = {
            id: 2,
            name: 'public entry 2',
            content: 'foo foo',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
            ttl: 60,
            linkId: 'bbbbbbbb',
            isPublic: 1
        };
        const privateEntry = {
            id: 3,
            name: 'private entry',
            content: 'bar',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()),
            ttl: 60,
            linkId: 'cccccccc',
            isPublic: 0
        };
        const expiredEntry = {
            id: 4,
            name: 'expired entry',
            content: 'bar',
            creationDateUnix: Math.floor(DateTime.now().toSeconds()) - 120,
            ttl: 60,
            linkId: 'dddddddd',
            isPublic: 1
        };
        await mysqlFixture({
            Clipboard: [publicEntry, publicEntry2, privateEntry, expiredEntry]
        });

        const expectedHTML = `<!DOCTYPE html>
<html>
<head>
 <title>Clipboard</title>
</head>
<body>
 <ul>
     <li>public entry - foo</li>
     <li>public entry 2 - foo foo</li>
 </ul>
</body>
</html>\n`;

        await request(app)
            .get('/clipboard/view')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                expect(response.text).to.equal(expectedHTML);
            });
    });
});
