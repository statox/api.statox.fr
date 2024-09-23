import { isDebug, isProd, isTests } from '../../config/env';
import { SensorErrorData, SensorLogData } from '../homeTracker';
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

type LoggableProperties =
    | {
          bucket?: string;
          cfGeoInfo?: CloudflareGeoInfo;
          cfRay?: string;
          code?: number;
          entryName?: string;
          error?: Error;
          executionTimeMs?: number;
          failedCalls?: number;
          forecast?: string;
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
          pressureMax?: number;
          pressureMin?: number;
          pressureOldest?: number;
          previousStatus?: string;
          previousTimestamp?: number;
          referenceTime?: string;
          remoteIp?: string;
          requestId?: string;
          requestInterrupted?: boolean;
          s3Key?: string;
          shutdownOrigin?: NodeJS.Signals | NodeJS.UncaughtExceptionOrigin;
          station?: string;
          stationId?: string;
          stationName?: string;
          status?: string;
          taskName?: string;
          timestamp?: number;
          trend?: string;
          validityTime?: string;
          visitedUrl?: string;
          watcherName?: string;
          xRequestInfo?: xRequestInfo;
          zValue?: number;
      }
    | SensorLogData
    | SensorErrorData;

export type LogObject = { component: AppLogComponent; message: string } | LoggableProperties;

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
