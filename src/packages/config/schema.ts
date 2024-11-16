import { JSONSchema } from 'json-schema-to-ts';

export const configSchema: JSONSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['mysql', 'elk', 'env', 'meteofrance', 'r2', 'slack'],
    properties: {
        mysql: {
            type: 'object',
            additionalProperties: false,
            required: ['connectionUrl'],
            properties: {
                connectionUrl: {
                    type: 'string'
                }
            }
        },
        elk: {
            type: 'object',
            additionalProperties: false,
            required: ['domainEndpoint', 'loggerUser', 'loggerPassword', 'apiEndpoint', 'apiKey'],
            properties: {
                domainEndpoint: {
                    description: 'URL of the logstash endpoint to ingest logs via slog',
                    type: 'string'
                },
                loggerUser: {
                    description: 'User for logstash',
                    type: 'string'
                },
                loggerPassword: {
                    description: 'Password for logstash',
                    type: 'string'
                },
                apiEndpoint: {
                    description: 'URL of the ELK cluster to ingest to be used as a document store',
                    type: 'string'
                },
                apiKey: {
                    description: 'Access key for the ELK cluster',
                    type: 'string'
                }
            }
        },
        env: {
            type: 'object',
            additionalProperties: false,
            required: ['isProd', 'isTests', 'isDebug'],
            properties: {
                isProd: {
                    description: 'True only on heroku production',
                    type: 'boolean'
                },
                isTests: {
                    description: 'True only when running tests with mocha',
                    type: 'boolean'
                },
                isDebug: {
                    description:
                        'Should be set to true only when running tests and more details is needed',
                    type: 'boolean'
                }
            }
        },
        meteofrance: {
            type: 'object',
            additionalProperties: false,
            required: ['apiKey'],
            properties: {
                apiKey: {
                    description: 'Api key for public-api.meteofrance.fr',
                    type: 'string'
                }
            }
        },
        r2: {
            description: 'Configuration to access Cloudflare R2 (S3 equivalent)',
            type: 'object',
            additionalProperties: false,
            required: ['accessKeyId', 'secretKey', 'endpoint'],
            properties: {
                accessKeyId: {
                    type: 'string'
                },
                secretKey: {
                    type: 'string'
                },
                endpoint: {
                    type: 'string'
                }
            }
        },
        slack: {
            type: 'object',
            additionalProperties: false,
            required: ['userId', 'webhookUrl'],
            properties: {
                userId: {
                    type: 'string'
                },
                webhookUrl: {
                    type: 'string'
                }
            }
        }
    }
};
