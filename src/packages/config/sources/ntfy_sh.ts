import { isProd, isTests } from './env.js';

const prodUrl = process.env.NTFY_PROD_URL!;
const localUrl = 'https://ntfy.sh/statoxtest';
const testUrl = 'http://127.0.0.1/ntfy_topic';

let currentUrl = localUrl;

if (isProd) {
    currentUrl = prodUrl;
} else if (isTests) {
    currentUrl = testUrl;
}

export const NTFY_SH_URL = currentUrl;
