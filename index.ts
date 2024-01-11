import { initApp } from './src/app';
import { initDb } from './src/services/db';
import { initLocalStackS3 } from './src/services/s3';

const start = async () => {
    await initLocalStackS3();
    await initDb();
    initApp();
};

start();
