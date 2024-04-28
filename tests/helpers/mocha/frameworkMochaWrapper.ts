import { initDb } from '../../../src/services/env-helpers/db';
import { restoreAppStub, setupAppStub } from '../app';
import { restoreFakeAuth, setupFakeAuth } from '../auth';
import { mysqlClearAllTables } from '../mysql';
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
            setupSlogSpy();
        },
        afterEach: () => {
            restoreSlogSpy();
        },
        afterAll: () => {
            restoreFakeAuth();
            restoreAppStub();
        }
    };
};
