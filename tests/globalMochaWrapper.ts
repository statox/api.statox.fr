import { initDb } from '../src/services/db';
import { initLocalStackS3 } from '../src/services/s3';
import { mysqlClearAllTables } from './helpers/mysql';

export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initLocalStackS3();
            await initDb();
        },
        beforeEach: async () => {
            return mysqlClearAllTables();
        }
    };
};
