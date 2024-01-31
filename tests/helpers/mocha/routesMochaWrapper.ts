import { initApp } from '../../../src/app';
import { initDb } from '../../../src/services/db';
import { restoreFakeAuth, setupFakeAuth } from '../auth';
import { mysqlClearAllTables } from '../mysql';
import { setupS3Spy } from '../s3';

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
        },
        afterAll: () => {
            restoreFakeAuth();
        }
    };
};
