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
    humidity2?: number;
    humidity?: number;
    insertTime?: string;
    internalHumidity?: number;
    internalTempCelsius?: number;
    linkId?: string;
    meanWindDirectionDegrees?: number;
    meanWindSpeedMS?: number;
    nbChords?: number;
    notification?: string;
    originalError?: Error;
    originalMessage?: string;
    path?: string;
    port?: number;
    precipitationMM?: number;
    pressureSeaLevelPa?: number;
    pressurehPa?: number;
    previousStatus?: string;
    previousTimestamp?: number;
    referenceTime?: string;
    remoteIp?: string;
    requestId?: string;
    requestInterrupted?: boolean;
    sensorName?: string;
    station?: string;
    stationId?: string;
    stationName?: string;
    status?: string;
    tempCelsius2?: number;
    tempCelsius?: number;
    timestamp?: number;
    validityTime?: string;
    visitedUrl?: string;
    watcherName?: string;
    xRequestInfo?: xRequestInfo;
};

export type LogObject = { component: AppLogComponent; message: string } | LoggableProperties;

export type AppLogComponent =
    | 'app'
    | 'chords'
    | 'env-helpers'
    | 'home-tracker'
    | 'meteo-france'
    | 'notifier'
    | 'reactor'
    | 'web-watcher';

export const log = (component: AppLogComponent, message: string, data?: LogObject) => {
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
