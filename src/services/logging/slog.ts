import { isDebug, isProd, isTests } from '../env-helpers/env';
import { logToELK } from './elk';

type CloudflareGeoInfo = {
    'cf-ipcity'?: string;
    'cf-ipcontinent'?: string;
    'cf-ipcountry'?: string;
    'cf-ipGeoPoint'?: {
        lat: number;
        lon: number;
    };
    'cf-region-code'?: string;
};
type xRequestInfo = {
    'x-request-id'?: string;
    'x-request-start'?: number;
};
// Should not contain a timestamp as it is added by logToELK (Maybe TODO refactor)
type LoggableProperties = {
    batteryCharge?: number;
    batteryPercent?: number;
    batteryReading?: number;
    cfGeoInfo?: CloudflareGeoInfo;
    cfRay?: string;
    code?: number;
    entryName?: string;
    error?: Error;
    executionTimeMs?: number;
    failedCalls?: number;
    humidity?: number;
    linkId?: string;
    nbChords?: number;
    notification?: string;
    originalError?: Error;
    originalMessage?: string;
    path?: string;
    port?: number;
    previousStatus?: string;
    previousTimestamp?: number;
    remoteIp?: string;
    requestId?: string;
    requestInterrupted?: boolean;
    sensorName?: string;
    status?: string;
    tempCelsius?: number;
    visitedUrl?: string;
    watcherName?: string;
    xRequestInfo?: xRequestInfo;
};

export type LogObject = { message: string } | LoggableProperties;

export const log = (message: string, data?: LogObject) => {
    if (isTests) {
        if (isDebug) {
            console.log(message, data || '');
        }
        return;
    }

    if (!isProd) {
        console.log(message, data || '');
        return;
    }

    logToELK({ message, ...data });
};
