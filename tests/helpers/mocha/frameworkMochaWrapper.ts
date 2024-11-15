import { TestHelper } from '../TestHelper.js';
import { initDb } from '../../../src/libs/databases/db.js';
import { testHelper_App } from '../app/index.js';
import { testHelper_Auth } from '../auth/index.js';
import { testHelper_Mysql } from '../mysql/index.js';
import { testHelper_S3 } from '../s3/index.js';
import { testHelper_SlackNotifier } from '../notifier/slack.js';
import { testHelper_Slog } from '../slog/index.js';

const helpers: TestHelper[] = [
    testHelper_Mysql,
    testHelper_Auth,
    testHelper_App,
    testHelper_SlackNotifier,
    testHelper_S3,
    testHelper_Slog
];

// Used for test of the framework (unlike routes tests don't init
// the app because we use a mock for the app)
export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initDb();

            for (const helper of helpers) {
                await helper.hooks.beforeAll();
            }
        },
        beforeEach: async () => {
            for (const helper of helpers) {
                await helper.hooks.beforeEach();
            }
        },
        afterEach: async () => {
            for (const helper of helpers) {
                await helper.hooks.afterEach();
            }
        },
        afterAll: async () => {
            for (const helper of helpers) {
                await helper.hooks.afterAll();
            }
        }
    };
};
