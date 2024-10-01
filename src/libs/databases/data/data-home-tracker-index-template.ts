/*
 * Index template of the data-home-tracker datasteam.
 * Used locally
 */
export const data_home_tracker_indexTemplate = {
    index_patterns: ['data-home-tracker*'],
    template: {
        mappings: {
            date_detection: true,
            // TODO map all existing properties?
            // For now adding only the one which cause issue in tests (e.g. first test create pressurehPa as integer, second test uses float, elk errors out)
            properties: {
                document: {
                    properties: {
                        pressurehPa: {
                            type: 'float'
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
    composed_of: [],
    priority: 500,
    _meta: {
        managed: false,
        description: 'Backing indexes of the data-home-tracker datastream'
    },
    data_stream: {
        hidden: false,
        allow_custom_routing: false
    },
    allow_auto_create: true
};
