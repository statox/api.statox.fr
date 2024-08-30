import request from 'supertest';
import { assert } from 'chai';
import { app } from '../../../../src/app';
import { th } from '../../../helpers';

describe('webWatcher/createWatcher', () => {
    describe('should fail', () => {
        it('on duplicate entry', async () => {
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
                .post('/webWatcher/createWatcher')
                .set('Accept', 'application/json')
                .send({
                    name: 'Web check 1',
                    notificationMessage: 'New message',
                    url: 'https://bar.com',
                    watchType: 'CSS',
                    cssSelector: '#the-title',
                    checkIntervalSeconds: 900
                })
                .expect(400)
                .then((response) => {
                    assert.deepEqual(response.body, { message: 'ENTRY_ALREADY_EXISTS' });
                });

            await th.mysql.checkTableLength('WebWatcher', 1);
        });
        it('on CSS check without css selector', async () => {
            await request(app)
                .post('/webWatcher/createWatcher')
                .set('Accept', 'application/json')
                .send({
                    name: 'Web check 1',
                    notificationMessage: 'New message',
                    url: 'https://bar.com',
                    watchType: 'CSS',
                    checkIntervalSeconds: 900
                })
                .expect(400)
                .then((response) => {
                    //TODO Fix returned error for JSONSchema and fix check
                    assert.match(
                        JSON.stringify(response.body),
                        new RegExp("must have required property 'cssSelector'")
                    );
                });

            await th.mysql.checkTableLength('WebWatcher', 0);
        });
        it('on HASH check with css selector', async () => {
            await request(app)
                .post('/webWatcher/createWatcher')
                .set('Accept', 'application/json')
                .send({
                    name: 'Web check 1',
                    notificationMessage: 'New message',
                    url: 'https://bar.com',
                    watchType: 'HASH',
                    cssSelector: 'foo > bar',
                    checkIntervalSeconds: 900
                })
                .expect(400)
                .then((response) => {
                    //TODO Fix returned error for JSONSchema and fix check
                    assert.match(
                        JSON.stringify(response.body),
                        new RegExp('must NOT have additional properties')
                    );
                });

            await th.mysql.checkTableLength('WebWatcher', 0);
        });
    });

    describe('should suceed', () => {
        it('creating a new CSS watcher', async () => {
            await th.mysql.fixture({
                WebWatcher: []
            });

            await request(app)
                .post('/webWatcher/createWatcher')
                .set('Accept', 'application/json')
                .send({
                    name: 'Web check 1',
                    notificationMessage: 'New message',
                    url: 'https://bar.com',
                    watchType: 'CSS',
                    cssSelector: '#the-title',
                    checkIntervalSeconds: 900
                })
                .expect(200)
                .then((response) => {
                    assert.deepEqual(response.body, {});
                });

            await th.mysql.checkTableLength('WebWatcher', 1);
            await th.mysql.checkContains({
                WebWatcher: [
                    {
                        id: 1,
                        name: 'Web check 1',
                        notificationMessage: 'New message',
                        url: 'https://bar.com',
                        watchType: 'CSS',
                        cssSelector: '#the-title',
                        lastContent: '',
                        lastCheckDateUnix: 0,
                        lastUpdateDateUnix: 0,
                        checkIntervalSeconds: 900
                    }
                ]
            });
        });

        it('creating a new HASH watcher', async () => {
            await th.mysql.fixture({
                WebWatcher: []
            });

            await request(app)
                .post('/webWatcher/createWatcher')
                .set('Accept', 'application/json')
                .send({
                    name: 'Hash check 1',
                    notificationMessage: 'New message',
                    url: 'https://bar.com',
                    watchType: 'HASH',
                    checkIntervalSeconds: 900
                })
                .expect(200)
                .then((response) => {
                    assert.deepEqual(response.body, {});
                });

            await th.mysql.checkTableLength('WebWatcher', 1);
            await th.mysql.checkContains({
                WebWatcher: [
                    {
                        id: 1,
                        name: 'Hash check 1',
                        notificationMessage: 'New message',
                        url: 'https://bar.com',
                        watchType: 'HASH',
                        cssSelector: '',
                        lastContent: '',
                        lastCheckDateUnix: 0,
                        lastUpdateDateUnix: 0,
                        checkIntervalSeconds: 900
                    }
                ]
            });
        });

        it('accepting both a HASH and CSS watcher on the same URL', async () => {
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
                .post('/webWatcher/createWatcher')
                .set('Accept', 'application/json')
                .send({
                    name: 'Hash check 1',
                    notificationMessage: 'New message',
                    url: 'https://foo.com',
                    watchType: 'HASH',
                    checkIntervalSeconds: 900
                })
                .expect(200)
                .then((response) => {
                    assert.deepEqual(response.body, {});
                });

            await th.mysql.checkTableLength('WebWatcher', 2);
            await th.mysql.checkContains({
                WebWatcher: [
                    {
                        id: 2,
                        name: 'Hash check 1',
                        notificationMessage: 'New message',
                        url: 'https://foo.com',
                        watchType: 'HASH',
                        cssSelector: ''
                    }
                ]
            });
        });
    });
});
