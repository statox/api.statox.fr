import { isDebug, isProd, isTests } from '../../config/env.js';
import { logToELK } from './elk.js';
import { AppLogComponent, LogObject } from './types.js';

const log = (component: AppLogComponent, message: string, data?: LogObject) => {
    if (isTests) {
        if (isDebug) {
            console.log(component, message, data || '');
        }
        return;
    }

    if (!isProd) {
        console.log(component, message, data || '');
        return;
    }
    logToELK({ component, message, ...data });
};

export const slog = {
    log
};
