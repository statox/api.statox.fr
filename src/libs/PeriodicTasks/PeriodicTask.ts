import { config } from '../../packages/config/index.js';
import { slog } from '../modules/logging/index.js';
import { slackNotifier } from '../modules/notifier/slack.js';

export class PeriodicTask {
    intervalMs: number;
    notifyOnFailure: boolean;
    task: () => Promise<void>;
    taskName: string;

    constructor(params: {
        intervalMinutes: number;
        notifyOnFailure?: boolean;
        task: () => Promise<void>;
        taskName: string;
    }) {
        this.intervalMs = params.intervalMinutes * 60 * 1000;
        this.notifyOnFailure = params.notifyOnFailure ?? false;
        this.task = params.task;
        this.taskName = params.taskName;
    }

    start() {
        // Avoid starting all periodic tasks at the app start to spread the load
        const maxRandomDelayAtStartMin = config.env.isProd ? 2 : 0;
        const randomDelayAtStartMS = Math.random() * maxRandomDelayAtStartMin * 60 * 1000;

        slog.log('periodic-tasks', 'First task run scheduled', {
            taskName: this.taskName,
            delayMs: randomDelayAtStartMS
        });
        setTimeout(() => this.runTask(), randomDelayAtStartMS);
    }

    async runTask() {
        slog.log('periodic-tasks', 'Start task', { taskName: this.taskName });
        try {
            await this.task();
        } catch (error) {
            slog.log('periodic-tasks', 'Failed task', {
                taskName: this.taskName,
                error: error as Error
            });

            if (this.notifyOnFailure) {
                slackNotifier.notifySlack({
                    message: `error in periodic task ${this.taskName}`,
                    error: error as Error
                });
            }
        }

        slog.log('periodic-tasks', 'Done task', { taskName: this.taskName });
        setTimeout(() => this.runTask(), this.intervalMs);
    }
}
