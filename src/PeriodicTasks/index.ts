import { slog } from '../services/logging';

const oneHour = 1000 * 3600;

export const startPeriodicTasks = () => {
    logHealth();
    setInterval(logHealth, oneHour);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logHealth = async () => {
    slog.log({ message: 'Health check' });
};
