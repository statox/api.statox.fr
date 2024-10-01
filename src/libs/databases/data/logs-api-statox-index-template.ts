/*
 * Index template of the logs-api-statox datasteam in case I need to recreate it
 * at one point
 */
export const logs_api_statox_indexTemplate = {
    index_patterns: ['logs-api-statox*'],
    template: {
        mappings: {
            _data_stream_timestamp: {
                enabled: true
            },
            date_detection: true,
            // TODO map all existing properties?
            // For now adding only the one which cause issue in tests (e.g. first test create pressurehPa as integer, second test uses float, elk errors out)
            properties: {
                '@timestamp': {
                    type: 'date',
                    ignore_malformed: false
                },
                document: {
                    properties: {
                        pressurehPa: {
                            type: 'float'
                        },
                        previousTimestamp: {
                            type: 'date',
                            ignore_malformed: true
                        },
                        remoteIp: {
                            type: 'ip'
                        },
                        timestampLatest: {
                            type: 'date',
                            ignore_malformed: true
                        },
                        timestampOldest: {
                            type: 'date',
                            ignore_malformed: true
                        }
                    }
                }
            }
        },
        settings: {
            index: {
                number_of_shards: '1',
                number_of_replicas: '0'
            }
        }
    },
    composed_of: ['logs@mappings', 'logs@settings', 'ecs@mappings'],
    priority: 1000,
    _meta: {
        managed: false,
        description: 'copied from default logs template installed by x-pack'
    },
    data_stream: {
        hidden: false,
        allow_custom_routing: false
    },
    allow_auto_create: true,
    deprecated: false
};
