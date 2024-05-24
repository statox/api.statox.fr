import { IncomingWebhook } from '@slack/webhook';
import { SLACK_USERID, SLACK_WEBHOOK_URL } from '../env-helpers/slack';
import { slog } from '../logging';

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

export const notifySlack = (params: { message?: string; error?: Error; directMention?: true }) => {
    try {
        const { message, error, directMention } = params;

        if (!message && !error) {
            throw new Error('Slack notification without message or error to notify');
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

        return webhook.send({ blocks });
    } catch (error) {
        slog.log('Error notifying slack', {
            error: error as Error,
            originalError: params.error,
            originalMessage: params.message
        });
    }
};
