export const logs_meteo_france_indexTemplate = {
    index_patterns: ['logs-meteo-france-*'],
    template: {
        mappings: {
            properties: {
                'document.observationTimestamp': {
                    type: 'date'
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
        description: 'copied from logs-api-statox logs template installed by x-pack'
    },
    data_stream: {
        hidden: false,
        allow_custom_routing: false
    },
    allow_auto_create: true
};
