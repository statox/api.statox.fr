import { initDb } from '../../../src/services/env-helpers/db.js';
import { restoreAppStub, setupAppStub } from '../app/index.js';
import { restoreFakeAuth, setupFakeAuth } from '../auth/index.js';
import { mysqlClearAllTables } from '../mysql/index.js';
import { setupS3Spy } from '../s3/index.js';
import { restoreSlogSpy, setupSlogSpy } from '../slog/index.js';

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
