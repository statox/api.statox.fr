import { initDb } from '../../../src/services/db';
import { initLocalStackS3 } from '../../../src/services/s3';
import { restoreFakeAuth, setupFakeAuth } from '../auth';
import { mysqlClearAllTables } from '../mysql';
import { restoreS3Spy, setupS3Spy } from '../s3';

// Used for test of the framework (don't init the app as some mocking is done directly in the test suite)
export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initLocalStackS3();
            await initDb();
            setupFakeAuth();
        },
        beforeEach: async () => {
            setupS3Spy();
            await mysqlClearAllTables();
        },
        afterAll: () => {
            restoreFakeAuth();
        },
        afterEach: () => {
            restoreS3Spy();
        }
    };
};
