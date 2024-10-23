import { slog } from '../modules/logging';
import { doHomeTrackerMonitoring } from '../modules/homeTracker';
import { doMeteoFrance } from '../modules/meteofrance';
import { doWebWatcher } from '../modules/webWatcher';
import { PeriodicTask } from './PeriodicTask';

const tasks = [
    new PeriodicTask({
        taskName: 'health check',
        task: async () => {
            slog.log('app', 'Health check');
        },
        intervalMinutes: 60
    }),
    new PeriodicTask({
        taskName: 'Web Watcher',
        task: doWebWatcher,
        intervalMinutes: 15
    }),
    new PeriodicTask({
        taskName: 'Meteo France',
        task: doMeteoFrance,
        intervalMinutes: 15
    }),
    new PeriodicTask({
        taskName: 'HomeTracker Monitoring',
        task: doHomeTrackerMonitoring,
        intervalMinutes: 20,
        notifyOnFailure: true
    })
];

export const startPeriodicTasks = () => {
    tasks.forEach((t) => t.start());
};
