import { config } from '../../../packages/config/index.js';
import { slog } from '../logging/slog.js';

const { topicUrl } = config.ntfy_sh;

const notify = async (params: { message: string; title?: string }) => {
    try {
        await fetch(topicUrl, {
            method: 'POST',
            body: params.message,
            headers: {
                Title: params.title || 'api.statox.fr'
                // Tags: 'rotating_light'
            }
        });
    } catch (error) {
        slog.log('notifier', 'Error notifying ntfy.sh', {
            error: error as Error,
            originalMessage: params.message
        });
    }
};

export const pushNotifier = {
    notify
};
