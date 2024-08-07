import { initApp } from '../../../src/app';
import { initDb } from '../../../src/libs/databases/db';
import { createApiKeys, restoreFakeAuth, setupFakeAuth } from '../auth';
import { mysqlClearAllTables } from '../mysql';
import { restoreNotifierSlackStub, setupNotifierSlackStub } from '../notifier/slack';
import { setupS3Spy } from '../s3';
import { restoreSlogSpy, setupSlogSpy } from '../slog';

// Used for tests of the routes
export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initDb();
            setupFakeAuth();
            initApp();
        },
        beforeEach: async () => {
            setupS3Spy();
            await mysqlClearAllTables();
            await createApiKeys();
            setupNotifierSlackStub();
            setupSlogSpy();
        },
        afterEach: () => {
            restoreNotifierSlackStub();
            restoreSlogSpy();
        },
        afterAll: () => {
            restoreFakeAuth();
        }
    };
};
