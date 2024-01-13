import { initApp } from '../../../src/app';
import { initDb } from '../../../src/services/db';
import { initLocalStackS3 } from '../../../src/services/s3';
import { restoreFakeAuth, setupFakeAuth } from '../auth';
import { mysqlClearAllTables } from '../mysql';
import { restoreS3Spy, setupS3Spy } from '../s3';

// Used for tests of the routes
export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initLocalStackS3();
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
        },
        afterEach: () => {
            restoreS3Spy();
        }
    };
};
