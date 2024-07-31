import request from 'supertest';
import { expect } from 'chai';
import { mysqlFixture, nowSec } from '../../helpers/mysql';
import { app } from '../../../src/app';

describe('clipboard/view', () => {
    it('should generate HTML page with only public non expired entries with an s3Key', async () => {
        const publicEntryNoKey = {
            id: 1,
            name: 'public entry no key',
            content: 'foo',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'a',
            isPublic: 1
        };
        const publicEntryKey = {
            id: 2,
            name: 'public entry key',
            content: 'foo foo',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'b',
            isPublic: 1,
            s3Key: 'foo'
        };
        const publicEntryLink = {
            id: 3,
            name: 'public entry link in content',
            content: 'https://foo.com:8080/bar',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'g',
            isPublic: 1
        };
        const privateEntryNoKey = {
            id: 4,
            name: 'private entry no key',
            content: 'bar',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'd',
            isPublic: 0
        };
        const privateEntryKey = {
            id: 5,
            name: 'private entry key',
            content: 'bar',
            creationDateUnix: nowSec(),
            ttl: 60,
            linkId: 'e',
            isPublic: 0,
            s3Key: 'bar'
        };
        const expiredEntry = {
            id: 6,
            name: 'expired entry',
            content: 'bar',
            creationDateUnix: nowSec() - 120,
            ttl: 60,
            linkId: 'f',
            isPublic: 1
        };
        await mysqlFixture({
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
                    creationDateUnix: nowSec()
                },
                {
                    bucket: 'clipboard',
                    s3Key: 'foo',
                    creationDateUnix: nowSec() - 120
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
                expect(response.text).to.match(expectedRE);
            });
    });
});
