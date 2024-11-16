export const configSchema = {
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
                    type: 'string',
                    pattern: '^mysql://[a-zA-Z0-9]+:.+@.+:[0-9]+/.+$'
                }
            }
        },
        elk: {
            type: 'object',
            additionalProperties: false,
            required: ['domainEndpoint', 'token', 'apiEndpoint', 'apiKey'],
            properties: {
                domainEndpoint: {
                    description: 'URL of the logstash endpoint to ingest logs via slog',
                    type: 'string',
                    pattern: '^https://.+'
                },
                token: {
                    description: 'Base64 of the user and password for authentication to logstash',
                    type: 'string',
                    minLength: 2
                },
                apiEndpoint: {
                    description: 'URL of the ELK cluster to ingest to be used as a document store',
                    type: 'string',
                    pattern: '^https?://.+'
                },
                apiKey: {
                    description: 'Access key for the ELK cluster',
                    type: 'string',
                    minLength: 2
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
                    type: 'string',
                    minLength: 2
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
                    type: 'string',
                    minLength: 2
                },
                secretKey: {
                    type: 'string',
                    minLength: 2
                },
                endpoint: {
                    type: 'string',
                    pattern: '^https://.+'
                }
            }
        },
        slack: {
            type: 'object',
            additionalProperties: false,
            required: ['userId', 'webhookUrl'],
            properties: {
                userId: {
                    description: 'My user ID to be @mentioned on slack (Found in the UI)',
                    type: 'string',
                    minLength: 2
                },
                webhookUrl: {
                    type: 'string',
                    pattern: '^https://.+'
                }
            }
        }
    }
} as const;
