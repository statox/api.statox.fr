import { isProd } from './env.js';

// My user ID to be @mentioned on slack (Found in the UI)
export const SLACK_USERID = isProd ? process.env.SLACK_USERID! : 'AZERTY';
export const SLACK_WEBHOOK_URL = isProd ? process.env.SLACK_WEBHOOK_URL! : 'https://127.0.0.1';
