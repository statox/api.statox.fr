import { initApp } from './src/app';
import { initDb } from './src/services/env-helpers/db';
import { initLocalStackS3 } from './src/services/env-helpers/s3';
import { slog } from './src/services/logging';
import { notifySlack } from './src/services/notifier/slack';

const start = async () => {
    await initLocalStackS3();
    await initDb();
    initApp();
    slog.log('app', 'App started');
    notifySlack({ message: 'App started' });
};

start();

// https://help.heroku.com/D5GK0FHU/how-can-my-node-app-gracefully-shutdown-when-receiving-sigterm
const shutdown = (signal: NodeJS.Signals | NodeJS.UncaughtExceptionOrigin) => {
    return (error: Error) => {
        slog.log('app', 'App will shutdown', { shutdownOrigin: signal, error });
        notifySlack({ message: 'App will shutdown' });

        if (error) {
            notifySlack({ message: 'Shutdown because of error', error });
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
