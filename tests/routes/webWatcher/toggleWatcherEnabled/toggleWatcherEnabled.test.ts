import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';

describe('webWatcher/toggleWatcherEnabled', () => {
    it('Should properly disable a watcher', async () => {
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
                    archivalDateUnix: null,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await request(app)
            .post('/webWatcher/toggleWatcherEnabled')
            .set('Accept', 'application/json')
            .send({
                watcherId: 1,
                setToEnabled: false
            })
            .expect(200);

        await th.mysql.checkContains({
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
                    archivalDateUnix: th.mysql.aroundNowSec,
                    checkIntervalSeconds: 0
                }
            ]
        });
    });

    it('Should properly re-enable a watcher', async () => {
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
                    archivalDateUnix: 10,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await request(app)
            .post('/webWatcher/toggleWatcherEnabled')
            .set('Accept', 'application/json')
            .send({
                watcherId: 1,
                setToEnabled: true
            })
            .expect(200);

        await th.mysql.checkContains({
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
                    archivalDateUnix: null,
                    checkIntervalSeconds: 0
                }
            ]
        });
    });
});
