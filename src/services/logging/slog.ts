import { isDebug, isProd, isTests } from '../env-helpers/env';
import { logToELK } from './elk';
import { logErrorToSlack, logMessageToSlack } from './slack';

// Should not contain a timestamp as it is added by logToELK (Maybe TODO refactor)
type LoggableProperties = {
    entryName?: string;
    error?: Error;
    linkId?: string;
    message?: string;
    port?: number;
    nbChords?: number;
    path?: string;
    remoteIp?: string;
    visitedUrl?: string;
};

type LogConfig = {
    logToSlack?: boolean;
};

export type LogObject = LoggableProperties & LogConfig;

export const log = (data: LogObject) => {
    if (isTests) {
        if (isDebug) {
            console.log(data);
        }
        return;
    }

    if (!isProd) {
        console.log(data);
        return;
    }

    logToELK(data);

    if (data.logToSlack) {
        if (data.message) {
            logMessageToSlack(data.message);
        }
        if (data.error) {
            logErrorToSlack(data.error);
        }
    }
};
