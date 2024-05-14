import { Agent, setGlobalDispatcher } from 'undici';

import { ELK_DOMAIN_ENDPOINT, ELK_TOKEN } from '../env-helpers/elk';
import { LogObject } from './slog';

// WARNING This disable SSL certificate checks for all queries but I need it only for
// my self hosted stack
const agent = new Agent({
    connect: {
        rejectUnauthorized: false
    }
});

setGlobalDispatcher(agent);

export const logToELK = async (data: LogObject) => {
    try {
        const body = {
            ...data,
            timestamp: Date.now()
        };

        const ingestURL = ELK_DOMAIN_ENDPOINT + '/api.statox.fr/_doc';
        await fetch(ingestURL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${ELK_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    } catch (error) {
        console.log('Couldnt log message to ELK');
        console.log(error);
    }
};
