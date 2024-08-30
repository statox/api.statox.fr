import { initApp } from '../../../src/app';
import { initDb } from '../../../src/libs/databases/db';
import { initELK } from '../../../src/libs/databases/elk';
import { createApiKeys, restoreFakeAuth, setupFakeAuth } from '../auth';
import { mockELKSearch, restoreElkSearch, restoreElkSpy, setupELKSpy } from '../elk';
import { mysqlClearAllTables } from '../mysql';
import { restoreNotifierSlackStub, setupNotifierSlackStub } from '../notifier/slack';
import { setupS3Spy } from '../s3';
import { restoreSlogSpy, setupSlogSpy } from '../slog';

// Used for tests of the routes
export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initDb();
            await initELK();
            mockELKSearch();
            setupFakeAuth();
            initApp();
        },
        beforeEach: async () => {
            setupS3Spy();
            await mysqlClearAllTables();
            await createApiKeys();
            setupNotifierSlackStub();
            setupSlogSpy();
            setupELKSpy();
        },
        afterEach: () => {
            restoreNotifierSlackStub();
            restoreSlogSpy();
            restoreElkSpy();
        },
        afterAll: () => {
            restoreFakeAuth();
            restoreElkSearch();
        }
    };
};
