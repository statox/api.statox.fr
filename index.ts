import { initApp } from './src/app.js';
import { initDb } from './src/services/env-helpers/db.js';
import { initLocalStackS3 } from './src/services/env-helpers/s3.js';
import { slog } from './src/services/logging/index.js';

const start = async () => {
    await initLocalStackS3();
    await initDb();
    initApp();
    slog.log({ message: 'App started' });
};

start();
