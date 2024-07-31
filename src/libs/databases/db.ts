import { AsyncDatabase } from 'promised-sqlite3';
import mysql, { Pool, PoolOptions } from 'mysql2/promise';
import url from 'url';
import { isProd, isTests } from '../config/env';
import { slog } from '../modules/logging';
import { ConfigError } from '../config/errors';

const PROD_URL = process.env.JAWSDB_URL!;
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

if (!dbUrl) {
    const configError = new ConfigError('db');
    slog.log('env-helpers', 'Cant start app', { error: configError });
    throw configError;
}

export let db: Pool;
export let db2: AsyncDatabase;
export const initDb = async () => {
    slog.log('app', 'init db');
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

    const connectionOptions: PoolOptions = {
        host: parsedUrl.hostname!,
        port: Number(parsedUrl.port!),
        user: parsedUrl.auth!.split(':')[0],
        password: parsedUrl.auth!.split(':')[1],
        database: parsedUrl.path!.slice(1),
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 1000
    };

    db = mysql.createPool(connectionOptions);
    db2 = await AsyncDatabase.open('./db.sqlite');

    await db2.run(
        `CREATE TABLE IF NOT EXISTS ReadingList (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            link TEXT NOT NULL,
            tags TEXT NOT NULL,
            creationDateUnix INTEGER NOT NULL,
            isPublic INTEGER NOT NULL,
            isDocument INTEGER NOT NULL,

            UNIQUE(link),
            UNIQUE(name)
        )`
    );
};

export type SQLError = Error & { code: string };

export const isSQLError = (error: SQLError | Error | unknown): error is SQLError => {
    return Boolean((error as SQLError).code) && typeof (error as SQLError).code === 'string';
};
