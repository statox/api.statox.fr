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
    cookbook_duplicateIngredient?: string;
    cookbook_nbIngredients?: number;
    cookbook_newRecipeId?: number;
    cookbook_newRecipeName?: string;
    dataStr?: string;
    delayMs?: number;
    enabled?: boolean;
    entryName?: string;
    error?: Error;
    eventTS?: number;
    eventType?: string;
    eventValue?: number;
    executionTimeMs?: number;
    failedCalls?: number;
    forecast?: string;
    gameId?: string;
    id?: number;
    insertTime?: string;
    instructSleepSec?: number;
    invalidField?: string;
    invalidValueStr?: string;
    lastAlertDateUnix?: number;
    lastSyncDateUnix?: number;
    linkId?: string;
    livemode?: boolean;
    meanWindDirectionDegrees?: number;
    meanWindSpeedMS?: number;
    nbChords?: number;
    notification?: string;
    originalError?: Error;
    originalMessage?: string;
    path?: string;
    playerId?: number;
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
    requiredScope?: string;
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
    url?: string;
    userId?: number;
    userScopes?: string[];
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
    | 'debug'
    | 'env-helpers'
    | 'gravitrips'
    | 'home-tracker'
    | 'meteo-france'
    | 'middleware'
    | 'notifier'
    | 'periodic-tasks'
    | 'reactor'
    | 's3Files'
    | 'weather-forecast'
    | 'web-watcher'
    | 'ws';

export type LogObject = { component: AppLogComponent; message: string } | LoggableProperties;
