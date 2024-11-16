import { isProd } from './env.js';
import { slog } from '../../../libs/modules/logging/index.js';
import { ConfigError } from '../errors.js';

// My user ID to be @mentioned on slack (Found in the UI)
export const SLACK_USERID = isProd ? process.env.SLACK_USERID! : 'AZERTY';
export const SLACK_WEBHOOK_URL = isProd ? process.env.SLACK_WEBHOOK_URL! : 'http://127.0.0.1';

if (!SLACK_USERID || !SLACK_WEBHOOK_URL) {
    const configError = new ConfigError('slack');
    slog.log('env-helpers', 'Cant start app', { error: configError });
    throw configError;
}
