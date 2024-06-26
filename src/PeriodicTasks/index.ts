import { slog } from '../services/logging';
import { doMeteoFrance } from '../services/meteofrance';
import { doWebWatcher } from '../services/webWatcher';

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
