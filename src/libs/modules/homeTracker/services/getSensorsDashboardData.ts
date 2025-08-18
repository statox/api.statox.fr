import { elk } from '../../../databases/elk.js';
import { SensorLogData } from '../types.js';
import { getAllSensorsMetadata } from './sensorMetaData.js';

interface SensorState {
    sensorName: string;
    hexColor: string;
    lastSyncDateUnix: number;
    lastAlertDateUnix: number | null;
    lastLogData: SensorLogData;
}

/*
 * Return the data of sensors to display in the dashboard of the
 * Home Tracker app Dashboard
 */
export const getSensorsDashboardData = async () => {
    const metadata = await getAllSensorsMetadata();
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

    const sensors: SensorState[] = [];
    for (const sensorMetaData of metadata) {
        const sensorName = sensorMetaData.name;

        const lastLogQuery = await elk.search<{ '@timestamp': number; document: SensorLogData }>({
            index: 'data-home-tracker',
            size: 1,
            query: {
                bool: {
                    filter: [{ term: { 'document.sensorName': sensorName } }]
                }
            },
            sort: [{ '@timestamp': { order: 'desc' } }]
        });

        const lastLog = lastLogQuery.hits.hits[0];
        const lastLogData = {
            ...lastLog._source!.document,
            timestamp: lastLog._source!['@timestamp']
        };

        // We try to get the log closest to one hour ago
        const oneHourAgoLogQuery = await elk.search<{
            '@timestamp': number;
            document: SensorLogData;
        }>({
            index: 'data-home-tracker',
            size: 1,
            query: {
                bool: {
                    filter: [{ term: { 'document.sensorName': sensorName } }]
                }
            },
            sort: [
                {
                    _script: {
                        type: 'number',
                        script: {
                            lang: 'painless',
                            source: "Math.abs(doc['@timestamp'].value.millis - params.target)",
                            params: { target: oneHourAgo }
                        },
                        order: 'asc'
                    }
                }
            ]
        });
        const oneHourAgoLog = oneHourAgoLogQuery.hits.hits[0];
        const oneHourAgoLogData = {
            ...oneHourAgoLog._source!.document,
            timestamp: oneHourAgoLog._source!['@timestamp']
        };

        // We try to get the log closest to one day ago
        // TODO Add a check and avoid returning the log if it's too far away from 1 day ago?
        const oneDayAgoLogQuery = await elk.search<{
            '@timestamp': number;
            document: SensorLogData;
        }>({
            index: 'data-home-tracker',
            size: 1,
            query: {
                bool: {
                    filter: [{ term: { 'document.sensorName': sensorName } }]
                }
            },
            sort: [
                {
                    _script: {
                        type: 'number',
                        script: {
                            lang: 'painless',
                            source: "Math.abs(doc['@timestamp'].value.millis - params.target)",
                            params: { target: oneDayAgo }
                        },
                        order: 'asc'
                    }
                }
            ]
        });
        const oneDayAgoLog = oneDayAgoLogQuery.hits.hits[0];
        const oneDayAgoLogData = {
            ...oneDayAgoLog._source!.document,
            timestamp: oneDayAgoLog._source!['@timestamp']
        };

        const sensorState = {
            sensorName,
            tempOffset: sensorMetaData.tempOffset,
            sleepTimeSec: sensorMetaData.sleepTimeSec,
            hexColor: sensorMetaData.hexColor,
            lastSyncDateUnix: sensorMetaData.lastSyncDateUnix,
            lastAlertDateUnix: sensorMetaData.lastAlertDateUnix,
            lastLogData,
            oneHourAgoLogData,
            oneDayAgoLogData
        };

        sensors.push(sensorState);
    }

    return { sensors };
};
