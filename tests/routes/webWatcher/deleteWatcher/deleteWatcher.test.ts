import request from 'supertest';
import { assert } from 'chai';
import { app } from '../../../../src/app';
import { mysqlCheckTableLength, mysqlFixture } from '../../../helpers/mysql';

describe('webWatcher/deleteWatcher', () => {
    it('should delete a watcher', async () => {
        await mysqlFixture({
            WebWatcher: [
                {
                    id: 1,
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    cssSelector: '#the-title',
                    lastContent: '',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await request(app)
            .post('/webWatcher/deleteWatcher')
            .set('Accept', 'application/json')
            .send({ id: 1 })
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {});
            });

        await mysqlCheckTableLength('WebWatcher', 0);
    });
});
