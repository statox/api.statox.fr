import { RowDataPacket } from 'mysql2/promise';
import jsdom from 'jsdom';
import { db } from '../env-helpers/db';
import { slog } from '../logging';

interface WatchedContent extends RowDataPacket {
    name: string;
    notificationMessage: string;
    url: string;
    cssSelector: string;
    lastContent: string;
    lastUpdateDateUnix: number;
}

const { JSDOM } = jsdom;

const getWatchedContent = async () => {
    const [content] = await db.query<WatchedContent[]>(
        `SELECT 
            id,
            name,
            notificationMessage,
            url,
            cssSelector,
            lastContent,
            lastCheckDateUnix,
            lastUpdateDateUnix,
            checkIntervalSeconds
        FROM WebWatcher
        `
    );
    return content;
};

const recordContentChanged = async (c: WatchedContent, newContent: string) => {
    slog.log({
        logToSlack: true,
        message: c.name + ' - ' + c.notificationMessage,
        watcherName: c.name,
        status: newContent
    });

    return db.query(
        `
        UPDATE WebWatcher
        SET lastContent = ?, lastUpdateDateUnix = UNIX_TIMESTAMP(), lastCheckDateUnix = UNIX_TIMESTAMP()
        WHERE id = ?
    `,
        [newContent, c.id]
    );
};

const recordContentChecked = async (c: WatchedContent) => {
    return db.query(
        `
        UPDATE WebWatcher
        SET lastCheckDateUnix = UNIX_TIMESTAMP()
        WHERE id = ?
    `,
        [c.id]
    );
};

const checkWatchedContent = async (c: WatchedContent) => {
    const { lastCheckDateUnix, checkIntervalSeconds, cssSelector, lastContent, url } = c;

    if (Date.now() / 1000 < lastCheckDateUnix + checkIntervalSeconds) {
        return;
    }

    const page = await fetch(url);
    const text = await page.text();

    const dom = new JSDOM(text);
    const doc = dom.window.document;

    const childElement = doc.querySelector(cssSelector);
    const childElementText = childElement?.textContent ?? 'N/A';
    const contentClean = childElementText.replaceAll('\n', '');

    if (contentClean !== lastContent) {
        return recordContentChanged(c, contentClean);
    }

    slog.log({ watcherName: c.name, message: 'Content not changed', status: contentClean });
    return recordContentChecked(c);
};

export const doWebWatcher = async () => {
    const contentsToCheck = await getWatchedContent();

    for (const content of contentsToCheck) {
        await checkWatchedContent(content);
    }
};
