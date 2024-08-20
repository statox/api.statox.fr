import { slog } from '../modules/logging';
import { isProd, isTests } from './env';
import { ConfigError } from './errors';

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

export const MYSQL_CONNECTION_URL = dbUrl;

if (!MYSQL_CONNECTION_URL) {
    const configError = new ConfigError('db');
    slog.log('env-helpers', 'Cant start app', { error: configError });
    throw configError;
}

try {
    new URL(MYSQL_CONNECTION_URL);
} catch (_e) {
    const configError = new ConfigError('db url invalid');
    slog.log('env-helpers', 'Cant start app', { error: configError });
    throw configError;
}
