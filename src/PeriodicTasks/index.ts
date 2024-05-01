import { slog } from '../services/logging';
import { watchKimsufi } from './kimsufiWatcher';

const minutes15 = 1000 * 60 * 15;
const hours1 = 1000 * 3600;

export const startPeriodicTasks = () => {
    logHealth();
    setInterval(logHealth, hours1);

    watchKimsufi();
    setInterval(watchKimsufi, minutes15);
};

const logHealth = async () => {
    slog.log({ message: 'Health check' });
};
