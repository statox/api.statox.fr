import { initApp } from './src/app';
import { initDb } from './src/services/env-helpers/db';
import { initLocalStackS3 } from './src/services/env-helpers/s3';
import { slog } from './src/services/logging';
import { logMessageToSlack } from './src/services/logging/slack';

const start = async () => {
    await initLocalStackS3();
    await initDb();
    initApp();
    slog.log({ message: 'App started' });
    logMessageToSlack('App started');
};

start();
