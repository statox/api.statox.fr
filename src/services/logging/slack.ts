import { IncomingWebhook } from '@slack/webhook';
import { isDebug, isProd, isTests } from '../env-helpers/env';

const url = isProd ? process.env.LOGS_SLACK_WEBHOOK_URL : '';

if (isProd && !url) {
    console.log('Error LOGS_SLACK_WEBHOOK_URL env variable is not defined');
    process.exit(1);
}

const webhook = new IncomingWebhook(url!);

export const logErrorToSlack = async (error: Error) => {
    if (isTests) {
        if (isDebug) {
            console.log(error);
        }
        return;
    }

    if (!isProd) {
        console.log(error);
        return;
    }

    try {
        const message = (error as Error).message;
        const stack = (error as Error).stack;

        await webhook.send({
            text: 'An error occurred:',
            blocks: [
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
            ]
        });
    } catch (error) {
        console.log('Couldnt log error to slack');
        console.log(error);
    }
};

export const logMessageToSlack = async (message: string) => {
    if (isTests) {
        if (isDebug) {
            console.log(message);
        }
        return;
    }

    if (!isProd) {
        console.log(message);
        return;
    }

    try {
        await webhook.send({
            text: 'An event occurred',
            blocks: [
                // {
                //     type: 'header',
                //     text: {
                //         type: 'plain_text',
                //         text: 'event'
                //     }
                // },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: message
                    }
                }
            ]
        });
    } catch (error) {
        console.log('Couldnt log error to slack');
        console.log(error);
    }
};
