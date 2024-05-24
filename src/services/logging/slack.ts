import { IncomingWebhook } from '@slack/webhook';
import { SLACK_USERID, SLACK_WEBHOOK_URL } from '../env-helpers/slack';

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

export const logErrorToSlack = async (error: Error, options?: { notify?: true }) => {
    try {
        const message = (error as Error).message;
        const stack = (error as Error).stack;

        const blocks = [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: message
                }
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Stack Trace:*\n${stack}`
                }
            }
        ];

        if (options?.notify) {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `<@${SLACK_USERID}>`
                }
            });
        }

        await webhook.send({
            text: 'An error occurred:',
            blocks
        });
    } catch (error) {
        console.log('Couldnt log error to slack');
        console.log(error);
    }
};

export const logMessageToSlack = async (message: string, options?: { notify?: true }) => {
    try {
        const blocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: message
                }
            }
        ];

        if (options?.notify) {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `<@${SLACK_USERID}>`
                }
            });
        }

        await webhook.send({
            text: 'An event occurred',
            blocks
        });
    } catch (error) {
        console.log('Couldnt log message to slack');
        console.log(error);
    }
};
