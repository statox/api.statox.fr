import { IncomingWebhook } from '@slack/webhook';
import { config } from '../../../packages/config/index.js';
import { slog } from '../logging/index.js';

const { isProd, isTests } = config.env;
const webhook = new IncomingWebhook(config.slack.webhookUrl);

const notifySlack = async (params: { message?: string; error?: Error; directMention?: true }) => {
    try {
        const { message, error, directMention } = params;

        if (!message && !error) {
            throw new Error('Slack notification without message or error to notify');
        }

        if (!isTests && !isProd) {
            console.log('===== NEW SLACK NOTIFICATION =====');
            console.log({ directMention });
            console.log({ message, error });
            return;
        }

        const blocks = [];

        if (directMention) {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `<@${config.slack.userId}>`
                }
            });
        }

        if (message) {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: message
                }
            });
        }

        if (error) {
            blocks.push({
                type: 'divider'
            });
            blocks.push({
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: error.message
                }
            });
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Stack Trace:*\n\`\`\`${error.stack}\n\`\`\``
                }
            });
        }

        await webhook.send({ blocks });
    } catch (error) {
        slog.log('notifier', 'Error notifying slack', {
            error: error as Error,
            originalError: params.error,
            originalMessage: params.message
        });
    }
};

export const slackNotifier = {
    notifySlack
};
