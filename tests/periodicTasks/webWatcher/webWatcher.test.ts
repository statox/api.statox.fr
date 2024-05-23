import sinon from 'sinon';
import { mysqlCheckContains, mysqlFixture } from '../../helpers/mysql';
import { doWebWatcher } from '../../../src/services/webWatcher';
import { slogCheckLog, slogCheckNoLogs } from '../../helpers/slog';

describe('WebWatcher', () => {
    let stub: sinon.SinonStub;
    beforeEach(() => {
        stub = sinon.stub(globalThis, 'fetch');
        const body =
            '<html><head><title id="the-title">Example Page</title></head><body><h1>A header</h1></body></html>';
        stub.withArgs('https://foo.com').resolves(new Response(body));
        stub.withArgs('https://bar.com').resolves(new Response(body));
    });
    afterEach(() => {
        stub.restore();
    });

    it('should detect a change, notify and record the change', async () => {
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
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
                    cssSelector: 'body > h1:nth-child(1)',
                    lastContent: 'old value',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await doWebWatcher();

        slogCheckLog({
            logToSlack: true,
            message: 'Web check 1 - Has changed',
            watcherName: 'Web check 1',
            status: 'Example Page',
            previousStatus: ''
        });
        slogCheckLog({
            logToSlack: true,
            message: 'Web check 2 - Has changed',
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
                    cssSelector: '#the-title',
                    lastContent: 'Example Page',
                    lastCheckDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    },
                    lastUpdateDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    },
                    checkIntervalSeconds: 0
                },
                {
                    id: 2,
                    lastContent: 'A header',
                    lastCheckDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    },
                    lastUpdateDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    }
                }
            ]
        });
    });

    it('Should respect the check interval and not check too often', async () => {
        const oneHourAgo = Math.round(Date.now() / 1000) - 3600;
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
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
                    cssSelector: '#the-title',
                    lastContent: '',
                    lastCheckDateUnix: oneHourAgo,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 6000
                }
            ]
        });
    });

    it('should update last check time even when no changed happened in the page', async () => {
        await mysqlFixture({
            WebWatcher: [
                {
                    name: 'Web check 1',
                    notificationMessage: 'Has changed',
                    url: 'https://foo.com',
                    cssSelector: '#the-title',
                    lastContent: 'Example Page',
                    lastCheckDateUnix: 0,
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                }
            ]
        });

        await doWebWatcher();

        slogCheckLog({
            logToSlack: undefined,
            message: 'Content not changed',
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
                    cssSelector: '#the-title',
                    lastContent: 'Example Page',
                    lastCheckDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    },
                    lastUpdateDateUnix: 0,
                    checkIntervalSeconds: 0
                }
            ]
        });
    });
});
