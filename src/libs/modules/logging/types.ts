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

export type LoggableProperties = {
    context?: LoggableProperties;

    bucket?: string;
    cfGeoInfo?: CloudflareGeoInfo;
    cfRay?: string;
    code?: number;
    dataStr?: string;
    delayMs?: number;
    enabled?: boolean;
    entryName?: string;
    error?: Error;
    executionTimeMs?: number;
    failedCalls?: number;
    forecast?: string;
    id?: number;
    insertTime?: string;
    invalidField?: string;
    invalidValueStr?: string;
    linkId?: string;
    livemode?: boolean;
    meanWindDirectionDegrees?: number;
    meanWindSpeedMS?: number;
    nbChords?: number;
    notification?: string;
    originalError?: Error;
    originalMessage?: string;
    path?: string;
    port?: number;
    precipitationMM?: number;
    pressureLatest?: number;
    pressureOldest?: number;
    pressurehPa?: number;
    previousStatus?: string;
    previousTimestamp?: number;
    referenceTime?: string;
    remoteIp?: string;
    requestId?: string;
    requestInterrupted?: boolean;
    s3Key?: string;
    sensorName?: string;
    shutdownOrigin?: NodeJS.Signals | NodeJS.UncaughtExceptionOrigin;
    station?: string;
    stationId?: string;
    stationName?: string;
    status?: string;
    taskName?: string;
    timestamp?: number;
    timestampLatest?: number;
    timestampOldest?: number;
    timewindow?: string;
    trend?: string;
    validityTime?: string;
    visitedUrl?: string;
    watcherName?: string;
    xRequestInfo?: xRequestInfo;
    zValue?: number;
};

export type AppLogComponent =
    | 'app'
    | 'auth'
    | 'chords'
    | 'env-helpers'
    | 'home-tracker'
    | 'meteo-france'
    | 'middleware'
    | 'notifier'
    | 'periodic-tasks'
    | 'reactor'
    | 'readingList'
    | 's3Files'
    | 'weather-forecast'
    | 'web-watcher';

export type LogObject = { component: AppLogComponent; message: string } | LoggableProperties;
