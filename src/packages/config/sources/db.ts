import { isProd, isTests } from './env.js';

// const PROD_URL = process.env.JAWSDB_URL!;
const PROD_URL = process.env.APIDB_URL!;
const DEV_URL = 'mysql://root:example@127.0.0.1:23306/db';
const TESTS_URL = 'mysql://root:example@127.0.0.1:23306/tests';

let dbUrl: string;
if (isProd) {
    dbUrl = PROD_URL;
} else if (isTests) {
    dbUrl = TESTS_URL;
} else {
    dbUrl = DEV_URL;
}

export const MYSQL_CONNECTION_URL = dbUrl;
