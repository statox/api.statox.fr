import { slog } from '../modules/logging/index.js';
import { doHomeTrackerMonitoring } from '../modules/homeTracker/index.js';
import { doMeteoFrance } from '../modules/meteofrance/index.js';
import { doPersonalTrackerReminder } from '../modules/personalTracker/index.js';
import { doWebWatcher } from '../modules/webWatcher/index.js';
import { PeriodicTask } from './PeriodicTask.js';

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
    }),
    new PeriodicTask({
        taskName: 'Personal Tracker Reminder',
        task: doPersonalTrackerReminder,
        intervalMinutes: 10
    })
];

export const startPeriodicTasks = () => {
    tasks.forEach((t) => t.start());
};
