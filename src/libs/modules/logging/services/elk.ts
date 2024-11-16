import { config } from '../../../../packages/config/index.js';
import { LogObject } from '../types.js';

export const logToELK = async (data: LogObject) => {
    try {
        const ingestURL = config.elk.domainEndpoint + '/api.statox.fr/_doc';
        await fetch(ingestURL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${config.elk.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log('Couldnt log message to ELK');
        console.log(error);
    }
};
