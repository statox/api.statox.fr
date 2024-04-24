import { slog } from '../services/logging';

const oneHour = 1000 * 3600;

export const startPeriodicTasks = () => {
    logHealth();
    setInterval(logHealth, oneHour);
};

const logHealth = async () => {
    slog.log({ message: 'Health check' });
};
