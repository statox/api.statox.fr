import request from 'supertest';
import { app } from '../../../src/app';
import { mysqlCheckContains, mysqlFixture } from '../../helpers/mysql';
import { mysqlCheckDoesNotContain } from '../../helpers/mysql/mysqlCheckDoesNotContain';

describe('clipboard/deleteEntry', () => {
    it('should delete an existing entry', async () => {
        await mysqlFixture({
            Clipboard: [
                {
                    id: 1,
                    name: 'entry 1',
                    content: 'foo',
                    creationDateUnix: 10,
                    ttl: 100,
                    linkId: 'aaaaaaaa'
                },
                {
                    id: 2,
                    name: 'entry 2',
                    content: 'foo',
                    creationDateUnix: 10,
                    ttl: 100,
                    linkId: 'bbbbbbbb'
                }
            ]
        });

        await request(app)
            .post('/clipboard/deleteEntry')
            .set('Accept', 'application/json')
            .send({
                name: 'entry 1'
            })
            .expect(200);

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'entry 2'
                }
            ]
        });

        await mysqlCheckDoesNotContain({
            Clipboard: [
                {
                    name: 'entry 1'
                }
            ]
        });
    });
});
