import { isDebug, isProd, isTests } from '../../config/env.js';
import { logToELK } from './services/elk.js';
import { AppLogComponent, LogObject } from './types.js';

type LogFn = (component: AppLogComponent, message: string, data?: LogObject) => void;

const elklog = (component: AppLogComponent, message: string, data?: LogObject) =>
    logToELK({ component, message, ...data });

const consolelog = (component: AppLogComponent, message: string, data?: LogObject) =>
    console.log(component, message, data || '');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nulllog = (component: AppLogComponent, message: string, data?: LogObject) => {};

let log: LogFn;

if (isProd) {
    log = elklog;
} else if ((isTests && isDebug) || (!isTests && !isProd)) {
    log = consolelog;
} else {
    log = nulllog;
}

export const slog: {
    log: LogFn;
} = {
    log
};
