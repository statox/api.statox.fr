import { AllowedSchema, validateAgainstJsonSchema } from '../../../libs/modules/ajv/index.js';
import { configSchema } from './schema.js';
import { Config } from '../types.js';
import { MYSQL_CONNECTION_URL } from '../sources/db.js';
import { ELK_API_ENDPOINT, ELK_API_KEY, ELK_DOMAIN_ENDPOINT, ELK_TOKEN } from '../sources/elk.js';
import { isDebug, isProd, isTests } from '../sources/env.js';
import { METEO_FRANCE_API_KEY } from '../sources/meteofrance.js';
import { R2_ACCESS_KEY_ID, R2_ENDPOINT, R2_SECRET_KEY } from '../sources/r2.js';
import { SLACK_USERID, SLACK_WEBHOOK_URL } from '../sources/slack.js';
import { NTFY_SH_URL } from '../sources/ntfy_sh.js';
import { HEADERS_TIMEOUT, REQUEST_TIMEOUT, SOCKET_TIMEOUT } from '../sources/timeouts.js';
import { EXPRESS_SESSION_SECRET } from '../sources/expressSessionSecret.js';

export const config: Config = {
    mysql: {
        connectionUrl: MYSQL_CONNECTION_URL
    },
    elk: {
        domainEndpoint: ELK_DOMAIN_ENDPOINT,
        token: ELK_TOKEN,
        apiEndpoint: ELK_API_ENDPOINT,
        apiKey: ELK_API_KEY
    },
    env: {
        isProd: isProd,
        isTests: isTests,
        isDebug: isDebug
    },
    express: {
        sessionsSecret: EXPRESS_SESSION_SECRET
    },
    ntfy_sh: {
        topicUrl: NTFY_SH_URL
    },
    meteofrance: {
        apiKey: METEO_FRANCE_API_KEY
    },
    r2: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretKey: R2_SECRET_KEY,
        endpoint: R2_ENDPOINT
    },
    slack: {
        userId: SLACK_USERID,
        webhookUrl: SLACK_WEBHOOK_URL
    },
    timeouts: {
        requestTimeout: REQUEST_TIMEOUT,
        headersTimeout: HEADERS_TIMEOUT,
        socketTimeout: SOCKET_TIMEOUT
    }
};

try {
    validateAgainstJsonSchema(config, configSchema as unknown as AllowedSchema);
} catch (error) {
    console.error("Configuration doesn't match expected schema");
    console.error(error);
    throw error;
}
