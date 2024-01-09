import { initDb } from '../src/services/db';
import { initLocalStackS3 } from '../src/services/s3';
import { mysqlClearAllTables } from './helpers/mysql';
import { restoreS3Spy, setupS3Spy } from './helpers/s3';

export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initLocalStackS3();
            await initDb();
        },
        beforeEach: async () => {
            setupS3Spy();
            await mysqlClearAllTables();
        },
        afterEach: () => {
            restoreS3Spy();
        }
    };
};
