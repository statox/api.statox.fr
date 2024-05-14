import jsdom from 'jsdom';
import { slog } from '../services/logging';
const { JSDOM } = jsdom;

let checksDoneSinceLastLog = -1;

export const watchKimsufi = async () => {
    const selector =
        '.ods-all-servers > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > details:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(12) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > div:nth-child(5) > div:nth-child(1)';

    const page = await fetch('https://eco.ovhcloud.com/fr/?display=list&range=kimsufi');
    const text = await page.text();

    const dom = new JSDOM(text);
    const document = dom.window.document;

    const childElement = document.querySelector(selector);
    const childElementText = childElement?.textContent ?? 'N/A';
    const contentClean = childElementText.replaceAll('\n', '');

    if (contentClean !== '  Prochainement disponible') {
        slog.log({ logToSlack: true, message: 'Kimsufi watcher', status: contentClean });
        slog.log({
            logToSlack: true,
            message:
                'Go buy a KS-4! https://eco.ovhcloud.com/fr/?display=list&range=kimsufi&prices=10%7C20'
        });
        return;
    }

    checksDoneSinceLastLog++;
    if (checksDoneSinceLastLog === 0 || checksDoneSinceLastLog >= 12) {
        slog.log({ message: 'Kimsufi watcher', status: contentClean, checksDoneSinceLastLog });
        checksDoneSinceLastLog = 0;
    }
};
