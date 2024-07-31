import { slog } from '../modules/logging';
import { doMeteoFrance } from '../modules/meteofrance';
import { doWebWatcher } from '../modules/webWatcher';

const minutes15 = 1000 * 60 * 15;
const hours1 = 1000 * 3600;

export const startPeriodicTasks = () => {
    logHealth();
    setInterval(logHealth, hours1);

    doWebWatcher();
    setInterval(doWebWatcher, minutes15);

    doMeteoFrance();
    setInterval(doMeteoFrance, minutes15);
};

const logHealth = async () => {
    slog.log('app', 'Health check');
};
