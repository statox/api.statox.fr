import { Client } from '@elastic/elasticsearch';
import { config } from '../../packages/config/index.js';
import { populateFakeHomeTrackerData } from '../../tools/elk/home-tracker-populate.js';
import { data_home_tracker_indexTemplate } from './data/data-home-tracker-index-template.js';
import { logs_meteo_france_indexTemplate } from './data/logs-meteo-france-index-template.js';
import { populateFakeMeteoFranceLogs } from '../../tools/elk/meteo-france-populate.js';

export let elk: Client;

const { isProd, isTests } = config.env;

if (isProd) {
    elk = new Client({
        node: config.elk.apiEndpoint,
        auth: {
            apiKey: config.elk.apiKey
        }
    });
} else {
    // It is not possible to generate a fixed API key so instead of trying to
    // get one at docker creation, locally we use a login/password authentication.
    elk = new Client({
        node: config.elk.apiEndpoint,
        auth: {
            username: 'elastic',
            password: 'foo'
        }
    });
}

const datastreams = [
    { name: 'logs-meteo-france', template: logs_meteo_france_indexTemplate },
    { name: 'data-home-tracker', template: data_home_tracker_indexTemplate }
];

export const elkClientTargetsLocalEnv = () => {
    const clientConnectionUrl = elk.connectionPool.connections[0].url.href;
    const localURLs = ['http://127.0.0.1:29200/'];

    return localURLs.includes(clientConnectionUrl);
};

const deleteIndexTemplates = async () => {
    if (!elkClientTargetsLocalEnv()) {
        throw new Error('DANGEROUS_OPERATION_ON_NON_LOCAL_ELK');
    }

    try {
        for (const ds of datastreams) {
            await elk.indices.deleteIndexTemplate({ name: ds.name });
        }
    } catch (error) {
        if ((error as Error).message.includes('index_template_missing_exception')) {
            console.log('index template data-home-tracker doesnt exist, skip');
        } else {
            throw error;
        }
    }
};

const deleteDataStreams = async () => {
    if (!elkClientTargetsLocalEnv()) {
        throw new Error('DANGEROUS_OPERATION_ON_NON_LOCAL_ELK');
    }

    try {
        for (const ds of datastreams) {
            await elk.indices.deleteDataStream({ name: ds.name });
        }
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

const createIndexTemplates = async () => {
    if (!elkClientTargetsLocalEnv()) {
        throw new Error('DANGEROUS_OPERATION_ON_NON_LOCAL_ELK');
    }

    for (const ds of datastreams) {
        await elk.indices.putIndexTemplate({
            name: ds.name,
            ...ds.template
        });
    }
};

const createDataStreams = async () => {
    if (!elkClientTargetsLocalEnv()) {
        throw new Error('DANGEROUS_OPERATION_ON_NON_LOCAL_ELK');
    }

    for (const ds of datastreams) {
        await elk.indices.createDataStream({ name: ds.name });
    }
};

export const resetDataStreamForTests = async () => {
    await deleteDataStreams();
    await createDataStreams();
};

export const initELK = async () => {
    if (isProd) {
        console.log('ELK init - dont init local ELK we are in prod');
        return;
    }

    try {
        console.log('ELK init - delete data stream');
        await deleteDataStreams();
        console.log('ELK init - delete index template');
        await deleteIndexTemplates();
        console.log('ELK init - create index template');
        await createIndexTemplates();
        console.log('ELK init - create data stream');
        await createDataStreams();

        if (!isTests) {
            // TODO: Maybe add more data. Potential problem: Creating too much data could slow down startup
            // but since this is run only when starting the app locally it might not be an issue
            console.log('ELK init - populate home-tracker data');
            await populateFakeHomeTrackerData();
            console.log('ELK init - populate logs-meteo-france');
            await populateFakeMeteoFranceLogs();
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
