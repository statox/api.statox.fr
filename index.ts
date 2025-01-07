import { initApp } from './src/app.js';
import { initDb } from './src/libs/databases/db.js';
import { initELK } from './src/libs/databases/elk.js';
import { initLocalStackS3 } from './src/libs/databases/s3.js';
import { slog } from './src/libs/modules/logging/index.js';
import { slackNotifier } from './src/libs/modules/notifier/slack.js';

const start = async () => {
    await initLocalStackS3();
    await initDb();
    await initELK();
    initApp();
    slog.log('app', 'App started');
};

start();

// https://help.heroku.com/D5GK0FHU/how-can-my-node-app-gracefully-shutdown-when-receiving-sigterm
const shutdown = (signal: NodeJS.Signals | NodeJS.UncaughtExceptionOrigin) => {
    return (error: Error) => {
        slog.log('app', 'App will shutdown', { shutdownOrigin: signal, error });

        if (error) {
            slackNotifier.notifySlack({ message: 'Shutdown because of error', error });
        }

        setTimeout(() => {
            process.exit(error ? 1 : 0);
        }, 5000).unref();
    };
};

process
    .on('SIGTERM', shutdown('SIGTERM'))
    .on('SIGINT', shutdown('SIGINT'))
    .on('uncaughtException', shutdown('uncaughtException'));
