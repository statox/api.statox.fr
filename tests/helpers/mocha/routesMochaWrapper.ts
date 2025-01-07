import { TestHelper } from '../TestHelper.js';
import { initApp } from '../../../src/app.js';
import { initDb } from '../../../src/libs/databases/db.js';
import { initELK } from '../../../src/libs/databases/elk.js';
import { testHelper_Auth } from '../auth/index.js';
import { testHelper_ELK } from '../elk/index.js';
import { testHelper_Mysql } from '../mysql/index.js';
import { testHelper_PushNotifier } from '../notifier/push.js';
import { testHelper_S3 } from '../s3/index.js';
import { testHelper_SlackNotifier } from '../notifier/slack.js';
import { testHelper_Slog } from '../slog/index.js';

// TODO Maybe implement a dependency mechanism. For now this is
// handled only with the order of this array.
// (e.g. auth which create api key must happen after mysql which
// cleans the tables.)
const helpers: TestHelper[] = [
    testHelper_Mysql,
    testHelper_Auth,
    testHelper_SlackNotifier,
    testHelper_PushNotifier,
    testHelper_S3,
    testHelper_Slog,
    testHelper_ELK
];

// Used for tests of the routes
export const mochaHooks = () => {
    return {
        beforeAll: async () => {
            await initDb();
            await initELK();

            for (const helper of helpers) {
                await helper.hooks.beforeAll();
            }

            initApp();
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
