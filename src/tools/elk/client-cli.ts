import { LogObject } from '../../libs/modules/logging/types.js';
import { config } from '../../packages/config/index.js';

/**
 * Makes a call to the logstash server to create a log in the
 * ELK datastream of the application logs
 *
 * Can be run from an heroku instance to create a log in prod stack:
 *      (Make sure you deployed the script on heroku before running)
 *      npx heroku run node dist/src/tools/elk/client-cli.js
 */
export const callELK = async (data: LogObject) => {
    try {
        const ingestURL = config.elk.domainEndpoint + '/api.statox.fr/_doc';
        console.log('Calling', ingestURL);
        console.log('With token of length', config.elk.token.length);

        return fetch(ingestURL, {
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

const res = await callELK({ component: 'debug', message: 'test' });

console.log('status', res?.status);
console.log(JSON.stringify(res, null, 2));
process.exit(0);
