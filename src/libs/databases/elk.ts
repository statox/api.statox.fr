import { Client } from '@elastic/elasticsearch';
import { ELK_API_ENDPOINT, ELK_API_KEY } from '../config/elk';
import { isProd, isTests } from '../config/env';

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

const clientTargetsLocalEnv = () => {
    const clientConnectionUrl = elk.connectionPool.connections[0].url.href;
    const localURLs = ['http://127.0.0.1:29200/'];

    return localURLs.includes(clientConnectionUrl);
};

const deleteExistingDataStream = async () => {
    if (!clientTargetsLocalEnv()) {
        console.log(`
You are trying to delete the data stream and index template "data-home-tracker" from a non-local ELK cluster.
This will result in the lost of all the sensor data on the cluster.

Are you REALLY SURE that's what you want to do?
If so you need to edit this function and remove the guard against non-local url
        `);
        throw new Error('DANGEROUS_DELETE_OPERATION_ON_NON_LOCAL_ELK');
    }

    console.log('ELK init - delete existing data stream data-home-tracker');
    await elk.indices.deleteDataStream({ name: 'data-home-tracker' });
    console.log('ELK init - delete existing index template data-home-tracker');
    await elk.indices.deleteIndexTemplate({ name: 'data-home-tracker' });
};

const createDataStream = async () => {
    if (!clientTargetsLocalEnv()) {
        console.log(`
    You are trying to create a data stream and index template "data-home-tracker" on a non-local ELK cluster.
    You probably don't need to do that since it was done once and you don't need to recreate them unless something went really wrong.

    Are you REALLY SURE that's what you want to do?
    If so you need to edit this function and remove the guard against non-local url
            `);
        throw new Error('DANGEROUS_DELETE_OPERATION_ON_NON_LOCAL_ELK');
    }

    console.log('ELK init - create index template data-home-tracker*');
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
                // TODO properly type document fields
            },
            settings: {
                index: {
                    number_of_shards: '1',
                    number_of_replicas: '0'
                }
            }
        }
    });

    console.log('ELK init - creating data stream');
    await elk.indices.createDataStream({ name: 'data-home-tracker' });
};

/*
 * const createLog = async () => {
 *     console.log('Creating log');
 *     const indexedDoc = await elk.index({
 *         index: 'data-home-tracker',
 *         document: {
 *             '@timestamp': new Date().toISOString(),
 *             document: {
 *                 message: 'Event while init ELK'
 *             }
 *         }
 *     });
 *     console.log('Created doc with id', indexedDoc._id);
 *
 *     console.log('Refresh index');
 *     await elk.indices.refresh({ index: 'data-home-tracker' });
 *
 *     console.log('Trying it get it immediately');
 *
 *     const singleLog = await elk.search({
 *         index: 'data-home-tracker',
 *         query: {
 *             term: {
 *                 _id: indexedDoc._id
 *             }
 *         }
 *     });
 *     console.log(JSON.stringify(singleLog));
 * };
 */

/*
 * const getAllLogs = async () => {
 *     console.log('Trying to get all logs:');
 *     const allLogs = await elk.search({
 *         index: 'data-home-tracker',
 *         query: {
 *             match_all: {}
 *         }
 *     });
 *     console.log(JSON.stringify(allLogs));
 * };
 */

export const initELK = async () => {
    await deleteExistingDataStream();
    await createDataStream();

    // const indexTemplate = await elk.indices.getIndexTemplate({ name: 'data-home-tracker' });
    // console.log('index template:');
    // console.log(JSON.stringify(indexTemplate, null, 2));

    // const index = await elk.indices.get({ index: 'data-home-tracker' });
    // console.log('index');
    // console.log(JSON.stringify(index, null, 2));

    // await createLog();

    // await getAllLogs();
    // console.log('Waiting for 5 seconds');
    // await setTimeout(5000);
    // await getAllLogs();
};

if (!isProd && !isTests) {
    // On prod we don't want to delete/recreate the existing data stream that would cause data loss
    // in tests we have the mocha wrapper calling initELK() when needed
    initELK();
}
