import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import url from 'url';
import { isProd, isTests } from './env';

const PROD_URL = process.env.JAWSDB_URL;
const DEV_URL = 'mysql://root:example@127.0.0.1:13306/db';
const TESTS_URL = 'mysql://root:example@127.0.0.1:13306/tests';

let dbUrl: string;
if (isProd) {
    if (PROD_URL) {
        dbUrl = PROD_URL;
    } else {
        throw Error('db PROD_URL is not defined');
    }
} else if (isTests) {
    dbUrl = TESTS_URL;
} else {
    dbUrl = DEV_URL;
}

export let db: Connection;
export const initDb = async () => {
    console.log('init db');
    const parsedUrl = url.parse(dbUrl);

    if (!parsedUrl) {
        throw new Error('Couldnt parse DB url');
    }

    const requiredFields: (keyof url.UrlWithStringQuery)[] = ['hostname', 'port', 'auth', 'path'];
    for (const field of requiredFields) {
        if (!parsedUrl[field]) {
            throw new Error(`Missing ${field} in DB url`);
        }
    }

    const connectionOptions: ConnectionOptions = {
        host: parsedUrl.hostname!,
        port: Number(parsedUrl.port!),
        user: parsedUrl.auth!.split(':')[0],
        password: parsedUrl.auth!.split(':')[1],
        database: parsedUrl.path!.slice(1)
    };

    db = await mysql.createConnection(connectionOptions);
    await db.connect();
};
