import sinon from 'sinon';
import { aroundNowSec, mysqlCheckContains, mysqlFixture } from '../../helpers/mysql';
import { doWebWatcher } from '../../../src/libs/modules/webWatcher';
import { slogCheckLog, slogCheckNoLogs } from '../../helpers/slog';
import { slackCheckNoNotifications, slackCheckNotification } from '../../helpers/notifier/slack';

describe('periodic task - webWatcher', () => {
    let stub: sinon.SinonStub;
    beforeEach(() => {
        stub = sinon.stub(globalThis, 'fetch');
        const body =
            '<html><head><title id="the-title">Example Page</title></head><body><h1>A header</h1></body></html>';
        stub.withArgs('https://foo.com').resolves(new Response(body));
        stub.withArgs('https://bar.com').resolves(new Response(body));
        stub.withArgs('https://fizz.com').resolves(new Response('foobar'));
    });
    afterEach(() => {
        stub.restore();
    });

    it('should detect a change, notify and record the change - for CSS Watchers', async () => {
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
                    cssSelector: '#the-title',
                    lastContent: '',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                },
                {
                    name: 'Web check 2',
                    notificationMessage: 'Has changed',
                    url: 'https://bar.com',
                    watchType: 'CSS',
                    cssSelector: 'body > h1:nth-child(1)',
                    lastContent: 'old value',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await doWebWatcher();

        slogCheckLog('web-watcher', 'WebWatcher content updated', {
            notification: 'Web check 1 - Has changed',
            watcherName: 'Web check 1',
            status: 'Example Page',
            previousStatus: ''
        });
        slogCheckLog('web-watcher', 'WebWatcher content updated', {
            notification: 'Web check 2 - Has changed',
            watcherName: 'Web check 2',
            status: 'A header',
            previousStatus: 'old value'
        });

        await mysqlCheckContains({
            WebWatcher: [
                {
                    id: 1,
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
                    cssSelector: '#the-title',
                    lastContent: 'Example Page',
                    lastCheckDateUnix: aroundNowSec,
                    lastUpdateDateUnix: aroundNowSec,
                    checkIntervalSeconds: 0,
                    lastErrorDateUnix: null,
                    lastErrorMessage: null
                },
                {
                    id: 2,
                    lastContent: 'A header',
                    lastCheckDateUnix: aroundNowSec,
                    lastUpdateDateUnix: aroundNowSec,
                    lastErrorDateUnix: null,
                    lastErrorMessage: null
                }
            ]
        });

        slackCheckNotification({ message: 'Web check 1 - Has changed', directMention: true });
        slackCheckNotification({ message: 'Web check 2 - Has changed', directMention: true });
    });

    it('should detect a change, notify and record the change - for HASH Watchers', async () => {
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Hash check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'HASH',
                    cssSelector: '',
                    lastContent: '',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                },
                {
                    name: 'Hash check 2',
                    notificationMessage: 'Has changed',
                    url: 'https://fizz.com',
                    watchType: 'HASH',
                    cssSelector: '',
                    lastContent: 'old value',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await doWebWatcher();

        slogCheckLog('web-watcher', 'WebWatcher content updated', {
            notification: 'Hash check 1 - Has changed',
            watcherName: 'Hash check 1',
            status: '965324907ec9f9d6ae72a8415dc127e853e746635b64fb8f2ac15427c3d2933c',
            previousStatus: ''
        });
        slogCheckLog('web-watcher', 'WebWatcher content updated', {
            notification: 'Hash check 2 - Has changed',
            watcherName: 'Hash check 2',
            status: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
            previousStatus: 'old value'
        });

        await mysqlCheckContains({
            WebWatcher: [
                {
                    id: 1,
                    name: 'Hash check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'HASH',
                    lastContent: '965324907ec9f9d6ae72a8415dc127e853e746635b64fb8f2ac15427c3d2933c',
                    lastCheckDateUnix: aroundNowSec,
                    lastUpdateDateUnix: aroundNowSec
                },
                {
                    id: 2,
                    lastContent: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
                    lastCheckDateUnix: aroundNowSec,
                    lastUpdateDateUnix: aroundNowSec,
                    lastErrorDateUnix: null,
                    lastErrorMessage: null
                }
            ]
        });

        slackCheckNotification({ message: 'Hash check 1 - Has changed', directMention: true });
        slackCheckNotification({ message: 'Hash check 2 - Has changed', directMention: true });
    });

    it('should respect the check interval and not check too often', async () => {
        const oneHourAgo = Math.round(Date.now() / 1000) - 3600;
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
                    cssSelector: '#the-title',
                    lastContent: '',
                    lastCheckDateUnix: oneHourAgo,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 6000
                }
            ]
        });

        await doWebWatcher();

        slogCheckNoLogs();

        await mysqlCheckContains({
            WebWatcher: [
                {
                    id: 1,
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
                    cssSelector: '#the-title',
                    lastContent: '',
                    lastCheckDateUnix: oneHourAgo,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 6000,
                    lastErrorDateUnix: null,
                    lastErrorMessage: null
                }
            ]
        });
        slackCheckNoNotifications();
    });

    it('should update last check time even when no changed happened in the page', async () => {
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
                    cssSelector: '#the-title',
                    lastContent: 'Example Page',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await doWebWatcher();

        slogCheckLog('web-watcher', 'WebWatcher content not changed', {
            watcherName: 'Web check 1',
            status: 'Example Page'
        });

        await mysqlCheckContains({
            WebWatcher: [
                {
                    id: 1,
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
                    cssSelector: '#the-title',
                    lastContent: 'Example Page',
                    lastCheckDateUnix: aroundNowSec,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0,
                    lastErrorDateUnix: null,
                    lastErrorMessage: null
                }
            ]
        });

        slackCheckNoNotifications();
    });

    it('should update error date and message when failure happens', async () => {
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
                    cssSelector: 'invalid @# > selector . adsf',
                    lastContent: 'Example Page',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await doWebWatcher();

        slogCheckLog('web-watcher', 'Failed to run watcher', {
            watcherName: 'Web check 1',
            error: sinon.match((error) => {
                return error.message === "'invalid @# > selector . adsf' is not a valid selector";
            })
        });

        await mysqlCheckContains({
            WebWatcher: [
                {
                    id: 1,
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'CSS',
                    cssSelector: 'invalid @# > selector . adsf',
                    lastContent: 'Example Page',
                    lastCheckDateUnix: aroundNowSec,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0,
                    lastErrorDateUnix: aroundNowSec,
                    lastErrorMessage: "'invalid @# > selector . adsf' is not a valid selector"
                }
            ]
        });

        slackCheckNotification({
            message: 'FAILED TO RUN WebWatcher - Web check 1',
            directMention: true
        });
    });

    it('should continue with other checks if one has an unsupported type in DB', async () => {
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Incorrect check',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    watchType: 'NOT SUPPORTED',
                    cssSelector: '',
                    lastContent: '',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                },
                {
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

        await doWebWatcher();

        slogCheckLog('web-watcher', 'WebWatcher content updated', {
            notification: 'Web check 1 - Has changed',
            watcherName: 'Web check 1',
            status: 'Example Page',
            previousStatus: ''
        });
        slogCheckLog('web-watcher', 'Failed to run watcher', {
            watcherName: 'Incorrect check'
        });
        slackCheckNotification({
            message: 'FAILED TO RUN WebWatcher - Incorrect check',
            directMention: true
        });
    });
});
