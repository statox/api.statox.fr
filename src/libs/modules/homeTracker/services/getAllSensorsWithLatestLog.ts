import { elk } from '../../../databases/elk';
import { SensorLogData } from '../types';

interface SensorState {
    sensorName: string;
    rgbColor: { r: number; g: number; b: number };
    lastLogTimestamp: number;
    lastLogData: SensorLogData;
}

const colorsOfKnownSensors: {
    [sensorName: string]: { r: number; g: number; b: number };
} = {
    'dev-jardiniere': { r: 0, g: 140, b: 0 },
    'dev-salon': { r: 140, g: 0, b: 60 },
    chambre: { r: 0, g: 80, b: 140 },
    jardiniere: { r: 0, g: 140, b: 0 },
    salon: { r: 140, g: 0, b: 60 },
    sdb: { r: 110, g: 110, b: 20 }
};
const defaultColor = { r: 250, g: 0, b: 250 };

export const getAllSensorsWithLatestLog = async () => {
    // Aggregate by sensor name first to get all the various sensors
    // then only keep the last log for each sensor
    // TODO maybe add a filter e.g. on the last 2 hours to have a meaningful
    // value of how many logs we got
    const result = await elk.search({
        index: 'data-home-tracker',
        size: 0,
        aggregations: {
            sensorName: {
                terms: {
                    field: 'document.sensorName.keyword'
                },
                aggregations: {
                    lastLog: {
                        top_hits: {
                            size: 1,
                            sort: [
                                {
                                    '@timestamp': 'desc'
                                }
                            ]
                        }
                    }
                }
            }
        }
    });

    const sensors: SensorState[] = [];
    // @ts-expect-error Not sure why the `.buckets` member is not in the typing
    for (const sensorBucket of result.aggregations?.sensorName.buckets || []) {
        const lastLog = sensorBucket.lastLog.hits.hits[0];
        const sensorState = {
            sensorName: sensorBucket.key,
            rgbColor: colorsOfKnownSensors[sensorBucket.key] || defaultColor,
            lastLogTimestamp: Math.floor(lastLog._source['@timestamp'] / 1000),
            lastLogData: lastLog._source.document
        };

        sensors.push(sensorState);
    }

    return { sensors };
};
