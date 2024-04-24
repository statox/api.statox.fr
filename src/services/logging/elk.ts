import { ELK_DOMAIN_ENDPOINT, ELK_TOKEN } from '../env-helpers/elk';
import { LogObject } from './slog';

export const logToELK = async (data: LogObject) => {
    try {
        const body = {
            ...data,
            timestamp: Date.now()
        };

        console.log('Logging to ELK');
        console.log(body);

        const ingestURL = ELK_DOMAIN_ENDPOINT + '/api.statox.fr-1/_doc';
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
};
