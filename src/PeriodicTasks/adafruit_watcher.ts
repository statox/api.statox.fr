import jsdom from 'jsdom';
import { slog } from '../services/logging';
const { JSDOM } = jsdom;

const URL = 'https://forums.adafruit.com/viewtopic.php?p=1016286';
const CSS_SELECTOR = '#page-body > div.action-bar.bar-top > div.pagination';
const CURRENT_CONTENT = '3 post• Page 1 of 1';
const WATCHER_NAME = 'Adafruit watcher';
const WATCHER_MESSAGE = 'New answer! https://forums.adafruit.com/viewtopic.php?p=1016286';
const LOG_EVERY_X_CHECKS = 24;

let checksDoneSinceLastLog = -1;

export const watchAdafruit = async () => {
    const selector = CSS_SELECTOR;

    const page = await fetch(URL);
    const text = await page.text();

    const dom = new JSDOM(text);
    const document = dom.window.document;

    const childElement = document.querySelector(selector);
    const childElementText = childElement?.textContent ?? 'N/A';
    const contentClean = childElementText.replaceAll('\n', '');

    if (contentClean !== CURRENT_CONTENT) {
        slog.log({ logToSlack: true, message: WATCHER_NAME, status: contentClean });
        slog.log({
            logToSlack: true,
            message: WATCHER_MESSAGE
        });
        return;
    }

    checksDoneSinceLastLog++;
    if (checksDoneSinceLastLog === 0 || checksDoneSinceLastLog >= LOG_EVERY_X_CHECKS) {
        slog.log({ message: WATCHER_NAME, status: contentClean, checksDoneSinceLastLog });
        checksDoneSinceLastLog = 0;
    }
};
