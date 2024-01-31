import { initDb } from '../../../src/services/db';
import { restoreFakeAuth, setupFakeAuth } from '../auth';
import { mysqlClearAllTables } from '../mysql';
import { setupS3Spy } from '../s3';

// Used for test of the framework (don't init the app as some mocking is done directly in the test suite)
export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initDb();
            setupFakeAuth();
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
