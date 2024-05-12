import { initApp } from '../../../src/app.js';
import { initDb } from '../../../src/services/env-helpers/db.js';
import { restoreFakeAuth, setupFakeAuth } from '../auth/index.js';
import { mysqlClearAllTables } from '../mysql/index.js';
import { setupS3Spy } from '../s3/index.js';
import { restoreSlogSpy, setupSlogSpy } from '../slog/index.js';

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
            setupSlogSpy();
        },
        afterEach: () => {
            restoreSlogSpy();
        },
        afterAll: () => {
            restoreFakeAuth();
        }
    };
};
