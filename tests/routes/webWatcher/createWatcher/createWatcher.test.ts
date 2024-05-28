import request from 'supertest';
import { assert } from 'chai';
import { app } from '../../../../src/app';
import { mysqlCheckContains, mysqlCheckTableLength, mysqlFixture } from '../../../helpers/mysql';

describe('/webWatcher/createWatcher', () => {
    it('should fail on duplicate entry', async () => {
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
            .post('/webWatcher/createWatcher')
            .set('Accept', 'application/json')
            .send({
                name: 'Web check 1',
                notificationMessage: 'New message',
                url: 'https://bar.com',
                cssSelector: '#the-title',
                checkIntervalSeconds: 900
            })
            .expect(400)
            .then((response) => {
                assert.deepEqual(response.body, { message: 'ENTRY_ALREADY_EXISTS' });
            });

        await mysqlCheckTableLength('WebWatcher', 1);
    });

    it('should create a new watcher', async () => {
        await mysqlFixture({
            WebWatcher: []
        });

        await request(app)
            .post('/webWatcher/createWatcher')
            .set('Accept', 'application/json')
            .send({
                name: 'Web check 1',
                notificationMessage: 'New message',
                url: 'https://bar.com',
                cssSelector: '#the-title',
                checkIntervalSeconds: 900
            })
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {});
            });

        await mysqlCheckTableLength('WebWatcher', 1);
        await mysqlCheckContains({
            WebWatcher: [
                {
                    id: 1,
                    name: 'Web check 1',
                    notificationMessage: 'New message',
                    url: 'https://bar.com',
                    cssSelector: '#the-title',
                    lastContent: '',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 900
                }
            ]
        });
    });
});
