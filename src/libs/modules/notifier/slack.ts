import { IncomingWebhook } from '@slack/webhook';
import { SLACK_USERID, SLACK_WEBHOOK_URL } from '../../config/slack';
import { slog } from '../logging';
import { isProd, isTests } from '../../config/env';

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

export const notifySlack = async (params: {
    message?: string;
    error?: Error;
    directMention?: true;
}) => {
    try {
        const { message, error, directMention } = params;

        if (!message && !error) {
            throw new Error('Slack notification without message or error to notify');
        }

        if (!isTests && !isProd) {
            console.log('SLACK NOTIFICATION', { directMention, message, error });
        }

        const blocks = [];

        if (directMention) {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `<@${SLACK_USERID}>`
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
