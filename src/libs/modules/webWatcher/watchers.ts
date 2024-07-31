import { db } from '../../databases/db';
import { QueryError } from 'mysql2/promise';
import { WatchedContent, WatchType } from './types';

export const getWatchedContent = async () => {
    const [content] = await db.query<WatchedContent[]>(
        `SELECT 
            id,
            name,
            notificationMessage,
            url,
            watchType,
            cssSelector,
            lastContent,
            lastCheckDateUnix,
            lastUpdateDateUnix,
            checkIntervalSeconds,
            lastErrorDateUnix,
            lastErrorMessage
        FROM WebWatcher
        `
    );
    return content;
};

export class EntryAlreadyExistsError extends Error {
    constructor() {
        super('ENTRY_ALREADY_EXISTS');
    }
}

interface NewWatcherParams {
    name: string;
    notificationMessage: string;
    url: string;
    watchType: WatchType;
    cssSelector?: string;
    checkIntervalSeconds: number;
}

export const createWatcher = async (newWatcherParams: NewWatcherParams) => {
    const {
        name,
        notificationMessage,
        url,
        watchType,
        cssSelector = '',
        checkIntervalSeconds
    } = newWatcherParams;

    try {
        await db.query(
            `INSERT INTO WebWatcher
            (name, notificationMessage, url, watchType, cssSelector, checkIntervalSeconds)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [name, notificationMessage, url, watchType, cssSelector, checkIntervalSeconds]
        );
    } catch (error) {
        if ((error as QueryError).code === 'ER_DUP_ENTRY') {
            throw new EntryAlreadyExistsError();
        }
        throw error;
    }
};

export const deleteWatcher = async (watcherId: number) => {
    await db.query(`DELETE FROM WebWatcher WHERE id = ?`, watcherId);
};
