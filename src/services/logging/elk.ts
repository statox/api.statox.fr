import { Agent, setGlobalDispatcher } from 'undici';

import {
    ELK_DOMAIN_ENDPOINT_2,
    ELK_TOKEN_2,
    ELK_DOMAIN_ENDPOINT,
    ELK_TOKEN
} from '../env-helpers/elk.js';
import { LogObject } from './slog.js';

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

        console.log('Logging to ELK');
        console.log(body);

        const ingestURL = ELK_DOMAIN_ENDPOINT + '/api.statox.fr/_doc';
        const response = await fetch(ingestURL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${ELK_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('ELK log status', response.status);
    } catch (error) {
        console.log('Couldnt log message to ELK');
        console.log(error);
    }

    // TMP log to panda logging stack
    try {
        const body = {
            ...data,
            '@timestamp': Date.now()
        };

        console.log('Logging to ELK 2');
        console.log(body);

        const ingestURL = ELK_DOMAIN_ENDPOINT_2 + '/api.statox.fr/_doc';
        const response = await fetch(ingestURL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${ELK_TOKEN_2}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('ELK log status', response.status);
    } catch (error) {
        console.log('Couldnt log message to ELK');
        console.log(error);
    }
};
