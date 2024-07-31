import { ELK_DOMAIN_ENDPOINT, ELK_TOKEN } from '../../config/elk';
import { LogObject } from './slog';

export const logToELK = async (data: LogObject) => {
    try {
        const ingestURL = ELK_DOMAIN_ENDPOINT + '/api.statox.fr/_doc';
        await fetch(ingestURL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${ELK_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log('Couldnt log message to ELK');
        console.log(error);
    }
};
