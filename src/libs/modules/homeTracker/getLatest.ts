import { elk } from '../../databases/elk';
import { SensorLogData } from './types';

interface SensorRecord {
    '@timestamp': number;
    document: SensorLogData;
}

export const getLatestData = async () => {
    const recordsBySensor: {
        [sensorName: string]: SensorRecord[];
    } = {};

    const result = await elk.search<SensorRecord>({
        index: 'data-home-tracker',
        // We don't need results in hits as the results we want are in the aggregation, hence size 0
        size: 1000,
        // We need the most recent documents for each sensor
        sort: [
            {
                '@timestamp': 'desc'
            }
        ],
        query: {
            range: {
                '@timestamp': {
                    gte: Date.now() - 24 * 60 * 60 * 1000
                }
            }
        }
    });

    for (const record of result.hits.hits) {
        const sensor = record._source?.document.sensorName || 'N/A';
        if (!recordsBySensor[sensor]) {
            recordsBySensor[sensor] = [];
        }
        if (record && record._source) {
            recordsBySensor[sensor].push(record._source);
        }
    }

    return { recordsBySensor };
};
