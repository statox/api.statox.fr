import mysql from 'mysql';

const PROD_URL = process.env.JAWSDB_URL;
const DEV_URL = 'mysql://root:example@127.0.0.1:13306/db';
const TESTS_URL = 'mysql://root:example@127.0.0.1:13306/tests';

let url: string;
if (process.env.ENV === 'prod') {
    if (PROD_URL) {
        url = PROD_URL;
    } else {
        throw Error('db PROD_URL is not defined');
    }
} else if (process.env.ENV === 'tests') {
    url = TESTS_URL;
} else {
    url = DEV_URL;
}

export const db = mysql.createConnection(url);
db.connect();
