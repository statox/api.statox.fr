import request from 'supertest';
import { WatchedContent } from '../../../../src/libs/modules/webWatcher/index.js';
import { app } from '../../../../src/app.js';
import { assert } from 'chai';
import { th } from '../../../helpers/index.js';

describe('webWatcher/getAllWatchers', () => {
    it('should return all the watchers', async () => {
        const data = [
            {
                id: 2,
                name: 'Web check 2',
                notificationMessage: 'Has changed',
                url: 'https://bar.com',
                watchType: 'CSS',
                cssSelector: 'body > h1:nth-child(1)',
                lastContent: 'old value',
                lastCheckDateUnix: 0,
                lastUpdateDateUnix: 0,
                archivalDateUnix: 10,
                checkIntervalSeconds: 0,
                lastErrorDateUnix: 10,
                lastErrorMessage: 'foo'
            },
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
                archivalDateUnix: null,
                checkIntervalSeconds: 0,
                lastErrorDateUnix: null,
                lastErrorMessage: null
            }
        ];

        await th.mysql.fixture({
            WebWatcher: data
        });

        await request(app)
            .get('/webWatcher/getAllWatchers')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                assert.deepEqual(
                    response.body.sort((a: WatchedContent, b: WatchedContent) => a.id - b.id),
                    data.sort((a, b) => a.id - b.id)
                );
            });
    });
});
