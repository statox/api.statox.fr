import { QueryError, RowDataPacket } from 'mysql2/promise';
import jsdom from 'jsdom';
import { db } from '../env-helpers/db';
import { slog } from '../logging';
import { notifySlack } from '../notifier/slack';
import { createHash } from 'node:crypto';

// TODO: Maybe add a JSON type with a json path selector
type WatchType =
    | 'CSS' // Watch a HTML page and use a css query to check its changing content
    | 'HASH'; // Watch any plain text and hash it completely

export interface WatchedContent extends RowDataPacket {
    id: number;
    name: string;
    notificationMessage: string;
    url: string;
    watchType: WatchType;
    cssSelector: string;
    lastContent: string;
    lastCheckDateUnix: number;
    lastUpdateDateUnix: number;
    checkIntervalSeconds: number;
    lastErrorDateUnix: number;
    lastErrorMessage: string;
}

export interface CSSWatchedContent extends WatchedContent {
    watchType: 'CSS';
}

export interface HASHWatchedContent extends WatchedContent {
    watchType: 'HASH';
}

function isCSSWatcherContent(c: WatchedContent): c is CSSWatchedContent {
    return c.watchType === 'CSS';
}

function isHASHWatcherContent(c: WatchedContent): c is HASHWatchedContent {
    return c.watchType === 'HASH';
}

const { JSDOM } = jsdom;

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
    cssSelector: string;
    checkIntervalSeconds: number;
}
export const createWatcher = async (newWatcherParams: NewWatcherParams) => {
    const { name, notificationMessage, url, watchType, cssSelector, checkIntervalSeconds } =
        newWatcherParams;

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

const recordContentChanged = async (params: {
    c: WatchedContent;
    previousContent: string;
    newContent: string;
}) => {
    const { c, previousContent, newContent } = params;
    slog.log('web-watcher', 'WebWatcher content updated', {
        notification: c.name + ' - ' + c.notificationMessage,
        watcherName: c.name,
        status: newContent,
        previousStatus: previousContent
    });
    notifySlack({ message: c.name + ' - ' + c.notificationMessage, directMention: true });

    return db.query(
        `
        UPDATE WebWatcher
        SET lastContent = ?,
        lastUpdateDateUnix = UNIX_TIMESTAMP(),
        lastCheckDateUnix = UNIX_TIMESTAMP(),
        lastErrorDateUnix = null,
        lastErrorMessage = null
        WHERE id = ?
    `,
        [newContent, c.id]
    );
};

const recordContentChecked = async (c: WatchedContent) => {
    return db.query(
        `
        UPDATE WebWatcher
        SET lastCheckDateUnix = UNIX_TIMESTAMP(),
        lastErrorDateUnix = null,
        lastErrorMessage = null
        WHERE id = ?
    `,
        [c.id]
    );
};

const recordContentCheckFailed = async (c: WatchedContent, error: Error) => {
    notifySlack({ message: 'FAILED TO RUN WebWatcher - ' + c.name, directMention: true });

    return db.query(
        `
        UPDATE WebWatcher
        SET lastCheckDateUnix = UNIX_TIMESTAMP(),
        lastErrorDateUnix = UNIX_TIMESTAMP(),
        lastErrorMessage = ?
        WHERE id = ?
    `,
        [error.message, c.id]
    );
};

const checkWatchedContent = async (c: WatchedContent) => {
    try {
        const { lastCheckDateUnix, lastContent, checkIntervalSeconds } = c;

        if (Date.now() / 1000 < lastCheckDateUnix + checkIntervalSeconds) {
            return;
        }

        let newContent = '';
        if (isCSSWatcherContent(c)) {
            newContent = await getCSSWatcherContent(c);
        } else if (isHASHWatcherContent(c)) {
            newContent = await getHASHWatcherContent(c);
        } else {
            throw new Error('unexpected watcher type: ' + c.watchType);
        }

        if (newContent !== lastContent) {
            return recordContentChanged({
                c,
                newContent,
                previousContent: lastContent
            });
        }

        slog.log('web-watcher', 'WebWatcher content not changed', {
            watcherName: c.name,
            status: newContent
        });
        return await recordContentChecked(c);
    } catch (error) {
        await recordContentCheckFailed(c, error as Error);
        throw error;
    }
};

const getCSSWatcherContent = async (c: CSSWatchedContent) => {
    const { cssSelector, url } = c;

    const page = await fetch(url);
    const text = await page.text();

    const dom = new JSDOM(text);
    const doc = dom.window.document;

    const childElement = doc.querySelector(cssSelector);
    const childElementText = childElement?.textContent ?? 'N/A';
    const contentClean = childElementText.replaceAll('\n', '');
    return contentClean;
};

const getHASHWatcherContent = async (c: HASHWatchedContent) => {
    const page = await fetch(c.url);
    const text = await page.text();

    const hash = createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
};

export const doWebWatcher = async () => {
    const contentsToCheck = await getWatchedContent();

    for (const content of contentsToCheck) {
        try {
            await checkWatchedContent(content);
        } catch (error) {
            slog.log('web-watcher', 'Failed to run watcher', {
                watcherName: content.name,
                error: error as Error
            });
        }
    }
};
