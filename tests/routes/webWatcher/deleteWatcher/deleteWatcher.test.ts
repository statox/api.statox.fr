import request from 'supertest';
import { assert } from 'chai';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';

describe('webWatcher/deleteWatcher', () => {
    it('should delete a watcher', async () => {
        await th.mysql.fixture({
            WebWatcher: [
                {
                    id: 1,
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
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
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({ id: 1 })
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {});
            });

        await th.mysql.checkTableLength('WebWatcher', 0);
    });
});
