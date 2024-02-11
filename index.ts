import { initApp } from './src/app';
import { initDb } from './src/services/env-helpers/db';
import { logMessageToSlack } from './src/services/logging/slack';
import { initLocalStackS3 } from './src/services/env-helpers/s3';

const start = async () => {
    await initLocalStackS3();
    await initDb();
    initApp();
    logMessageToSlack('App started');
};

start();
