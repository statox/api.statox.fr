import { Client } from '@elastic/elasticsearch';
import { ELK_API_ENDPOINT, ELK_API_KEY } from '../config/elk';
import { isProd, isTests } from '../config/env';
import { populateFakeHomeTrackerData } from '../../tools/elk/home-tracker-populate';

export let elk: Client;

if (isProd) {
    elk = new Client({
        node: ELK_API_ENDPOINT,
        auth: {
            apiKey: ELK_API_KEY!
        }
    });
} else {
    // It is not possible to generate a fixed API key so instead of trying to
    // get one at docker creation, locally we use a login/password authentication.
    elk = new Client({
        node: ELK_API_ENDPOINT,
        auth: {
            username: 'elastic',
            password: 'foo'
        }
    });
}

export const elkClientTargetsLocalEnv = () => {
    const clientConnectionUrl = elk.connectionPool.connections[0].url.href;
    const localURLs = ['http://127.0.0.1:29200/'];

    return localURLs.includes(clientConnectionUrl);
};

const deleteIndexTemplate = async () => {
    if (!elkClientTargetsLocalEnv()) {
        throw new Error('DANGEROUS_OPERATION_ON_NON_LOCAL_ELK');
    }

    try {
        await elk.indices.deleteIndexTemplate({ name: 'data-home-tracker' });
    } catch (error) {
        if ((error as Error).message.includes('index_template_missing_exception')) {
            console.log('index template data-home-tracker doesnt exist, skip');
        } else {
            throw error;
        }
    }
};

const deleteDataStream = async () => {
    if (!elkClientTargetsLocalEnv()) {
        throw new Error('DANGEROUS_OPERATION_ON_NON_LOCAL_ELK');
    }

    try {
        await elk.indices.deleteDataStream({ name: 'data-home-tracker' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (
            errorMessage.includes('resource_not_found_exception') ||
            errorMessage.includes('index_not_found_exception')
        ) {
            console.log('data stream data-home-tracker doesnt exist, skip');
        } else {
            throw error;
        }
    }
};

const createIndexTemplate = async () => {
    if (!elkClientTargetsLocalEnv()) {
        throw new Error('DANGEROUS_OPERATION_ON_NON_LOCAL_ELK');
    }

    await elk.indices.putIndexTemplate({
        name: 'data-home-tracker',
        priority: 500,
        index_patterns: 'data-home-tracker*',
        data_stream: {},
        allow_auto_create: true,
        _meta: {
            description: 'Backing indexes of the data-home-tracker datastream'
        },
        template: {
            mappings: {
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
        }
    });
};

const createDataStream = async () => {
    if (!elkClientTargetsLocalEnv()) {
        throw new Error('DANGEROUS_OPERATION_ON_NON_LOCAL_ELK');
    }

    await elk.indices.createDataStream({ name: 'data-home-tracker' });
};

export const resetDataStreamForTests = async () => {
    await deleteDataStream();
    await createDataStream();
};

export const initELK = async () => {
    if (isProd) {
        console.log('ELK init - dont init local ELK we are in prod');
        return;
    }

    try {
        console.log('ELK init - delete data stream');
        await deleteDataStream();
        console.log('ELK init - delete index template');
        await deleteIndexTemplate();
        console.log('ELK init - create index template');
        await createIndexTemplate();
        console.log('ELK init - create data stream');
        await createDataStream();

        if (!isTests) {
            // TODO: Maybe add more data. Potential problem: Creating too much data could slow down startup
            // but since this is run only when starting the app locally it might not be an issue
            console.log('ELK init - populate home-tracker data');
            await populateFakeHomeTrackerData();
        }
    } catch (error) {
        if ((error as Error).name === 'DANGEROUS_OPERATION_ON_NON_LOCAL_ELK') {
            console.log(`
    You are trying to create a data stream and index template "data-home-tracker" on a non-local ELK cluster.
    You probably don't need to do that since it was done once and you don't need to recreate them unless something went really wrong.

    Are you REALLY SURE that's what you want to do?
    If so you need to edit this function and remove the guard against non-local url
            `);
        }
        throw error;
    }
};
