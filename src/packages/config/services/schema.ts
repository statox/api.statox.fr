export const configSchema = {
    type: 'object',
    additionalProperties: false,
    required: [
        'mysql',
        'elk',
        'env',
        'express',
        'ntfy_sh',
        'meteofrance',
        'r2',
        'slack',
        'timeouts'
    ],
    properties: {
        mysql: {
            type: 'object',
            additionalProperties: false,
            required: ['connectionUrl'],
            properties: {
                connectionUrl: {
                    type: 'string',
                    pattern: '^mysql://[-a-zA-Z0-9]+:.+@.+:[0-9]+/.+$'
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
        express: {
            type: 'object',
            additionalProperties: false,
            required: ['sessionsSecret'],
            properties: {
                sessionsSecret: {
                    description:
                        'The secret to use to validate express sessions. Changing this value will invalidate all existing sessions.',
                    type: 'string'
                }
            }
        },
        ntfy_sh: {
            type: 'object',
            additionalProperties: false,
            required: ['topicUrl'],
            properties: {
                topicUrl: {
                    description: 'The topic url to send push notifications via nfty.sh',
                    type: 'string',
                    minLength: 2
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
                    pattern: '^https?://.+'
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
                    pattern: '^https?://.+'
                }
            }
        },
        timeouts: {
            type: 'object',
            additionalProperties: false,
            required: ['requestTimeout', 'headersTimeout', 'socketTimeout'],
            properties: {
                requestTimeout: {
                    description:
                        'Limit for how long the server should wait to receive the entire request (including the body) from the client',
                    type: 'number'
                },
                headersTimeout: {
                    description: 'Time allowed for receiving request headers from the client.',
                    type: 'number'
                },
                socketTimeout: {
                    description:
                        'Limit the inactivity period (no data sent or received) on an established socket connection',
                    type: 'number'
                }
            }
        }
    }
} as const;
