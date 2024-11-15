import request from 'supertest';
import { app } from '../../../src/app.js';
import { assert } from 'chai';
import { th } from '../../helpers/index.js';

describe('clipboard/view', () => {
    it('should generate HTML page with only public non expired entries with an s3Key', async () => {
        const publicEntryNoKey = {
            id: 1,
            name: 'public entry no key',
            content: 'foo',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'a',
            isPublic: 1
        };
        const publicEntryKey = {
            id: 2,
            name: 'public entry key',
            content: 'foo foo',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'b',
            isPublic: 1,
            s3Key: 'foo'
        };
        const publicEntryLink = {
            id: 3,
            name: 'public entry link in content',
            content: 'https://foo.com:8080/bar',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'g',
            isPublic: 1
        };
        const privateEntryNoKey = {
            id: 4,
            name: 'private entry no key',
            content: 'bar',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'd',
            isPublic: 0
        };
        const privateEntryKey = {
            id: 5,
            name: 'private entry key',
            content: 'bar',
            creationDateUnix: th.mysql.nowSec(),
            ttl: 60,
            linkId: 'e',
            isPublic: 0,
            s3Key: 'bar'
        };
        const expiredEntry = {
            id: 6,
            name: 'expired entry',
            content: 'bar',
            creationDateUnix: th.mysql.nowSec() - 120,
            ttl: 60,
            linkId: 'f',
            isPublic: 1
        };
        await th.mysql.fixture({
            Clipboard: [
                publicEntryNoKey,
                publicEntryKey,
                publicEntryLink,
                privateEntryNoKey,
                privateEntryKey,
                expiredEntry
            ],
            S3Files: [
                {
                    bucket: 'clipboard',
                    s3Key: 'bar',
                    creationDateUnix: th.mysql.nowSec()
                },
                {
                    bucket: 'clipboard',
                    s3Key: 'foo',
                    creationDateUnix: th.mysql.nowSec() - 120
                }
            ]
        });

        const expectedHTML = `<!DOCTYPE html>
<html>
<head>
<title>Clipboard</title>
</head>
<body>
<ul>
    <li>
        ${publicEntryKey.name}
        - ${publicEntryKey.content}
        - <a href="http.*;GetObject">Download</a>
    </li>
    <li>
        ${publicEntryLink.name}
        - <a href="${publicEntryLink.content}">${publicEntryLink.content}</a>
    </li>
</ul>
</body>
</html>\n`;

        const expectedRE = new RegExp(expectedHTML);

        await request(app)
            .get('/clipboard/view')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                assert.match(response.text, expectedRE);
            });
    });
});
