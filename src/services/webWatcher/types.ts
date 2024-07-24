import { RowDataPacket } from 'mysql2/promise';

// TODO: Maybe add a JSON type with a json path selector
export type WatchType =
    | 'CSS' // Watch a HTML page and use a css query to check its changing content
    | 'HASH'; // Watch any plain text and hash it completely

export interface WatchedContent extends RowDataPacket {
    id: number;
    name: string;
    notificationMessage: string;
    url: string;
    watchType: WatchType;
    lastContent: string;
    lastCheckDateUnix: number;
    lastUpdateDateUnix: number;
    checkIntervalSeconds: number;
    lastErrorDateUnix: number;
    lastErrorMessage: string;
}

export interface CSSWatchedContent extends WatchedContent {
    watchType: 'CSS';
    cssSelector: string;
}

export interface HASHWatchedContent extends WatchedContent {
    watchType: 'HASH';
}

export function isCSSWatcherContent(c: WatchedContent): c is CSSWatchedContent {
    return c.watchType === 'CSS';
}

export function isHASHWatcherContent(c: WatchedContent): c is HASHWatchedContent {
    return c.watchType === 'HASH';
}
