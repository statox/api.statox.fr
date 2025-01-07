import jsdom from 'jsdom';
import { db } from '../../databases/db.js';
import { slog } from '../logging/index.js';
import { createHash } from 'node:crypto';
import {
    CSSWatchedContent,
    HASHWatchedContent,
    isCSSWatcherContent,
    isHASHWatcherContent,
    WatchedContent
} from './types.js';
import { getEnabledWatchedContent } from './watchers.js';
import { pushNotifier, slackNotifier } from '../notifier/index.js';

const { JSDOM } = jsdom;

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

    slackNotifier.notifySlack({
        message: c.name + ' - ' + c.notificationMessage,
        directMention: true
    });
    pushNotifier.notify({
        title: 'Web Watcher',
        message: c.name + ' - ' + c.notificationMessage
    });

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
    slackNotifier.notifySlack({
        message: 'FAILED TO RUN WebWatcher - ' + c.name,
        directMention: true,
        error
    });

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
    const contentsToCheck = await getEnabledWatchedContent();

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
