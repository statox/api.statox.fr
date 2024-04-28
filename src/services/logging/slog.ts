import { isDebug, isProd, isTests } from '../env-helpers/env';
import { logToELK } from './elk';
import { logErrorToSlack, logMessageToSlack } from './slack';

type CloudflareGeoInfo = {
    'cf-ipcity'?: string;
    'cf-ipcontinent'?: string;
    'cf-ipcountry'?: string;
    'cf-iplatitude'?: string;
    'cf-iplongitude'?: string;
    'cf-region-code'?: string;
};
type xRequestInfo = {
    'x-request-id'?: string;
    'x-request-start'?: number;
};
// Should not contain a timestamp as it is added by logToELK (Maybe TODO refactor)
type LoggableProperties = {
    cfGeoInfo?: CloudflareGeoInfo;
    cfRay?: string;
    code?: number;
    entryName?: string;
    error?: Error;
    executionTimeMs?: number;
    extRequestId?: string;
    linkId?: string;
    message?: string;
    nbChords?: number;
    path?: string;
    port?: number;
    remoteIp?: string;
    requestId?: string;
    requestInterrupted?: boolean;
    visitedUrl?: string;
    xRequestInfo?: xRequestInfo;
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
