import { initDb } from '../../../src/libs/databases/db';
import { restoreAppStub, setupAppStub } from '../app';
import { createApiKeys, restoreFakeAuth, setupFakeAuth } from '../auth';
import { mysqlClearAllTables } from '../mysql';
import { restoreNotifierSlackStub, setupNotifierSlackStub } from '../notifier/slack';
import { setupS3Spy } from '../s3';
import { restoreSlogSpy, setupSlogSpy } from '../slog';

// Used for test of the framework (don't init the app as some mocking is done directly in the test suite)
export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initDb();
            setupFakeAuth();
            setupAppStub();
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
            restoreAppStub();
        }
    };
};
