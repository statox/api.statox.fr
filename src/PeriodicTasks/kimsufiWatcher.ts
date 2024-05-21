import jsdom from 'jsdom';
import { slog } from '../services/logging';
const { JSDOM } = jsdom;

const URL = 'https://eco.ovhcloud.com/fr/?display=list&range=kimsufi';
const CSS_SELECTOR =
    '.ods-all-servers > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > details:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(12) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > div:nth-child(5) > div:nth-child(1)';
const CURRENT_CONTENT = '  Prochainement disponible';
const WATCHER_NAME = 'Kimsufi watcher';
const WATCHER_MESSAGE =
    'Go buy a KS-4! https://eco.ovhcloud.com/fr/?display=list&range=kimsufi&prices=10%7C20';
const LOG_EVERY_X_CHECKS = 12;

let checksDoneSinceLastLog = -1;

export const watchKimsufi = async () => {
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
