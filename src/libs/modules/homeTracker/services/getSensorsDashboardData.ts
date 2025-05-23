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

    // Aggregate by sensor name first to get all the various sensors
    // then only keep the last log for each sensor
    const logsBySensor = await elk.search({
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
    for (const sensorMetaData of metadata) {
        const sensorName = sensorMetaData.name;
        // @ts-expect-error Not sure why the `.buckets` member is not in the typing
        const sensorBucket = logsBySensor.aggregations?.sensorName.buckets.find(
            (bucket: { key: string }) => bucket.key === sensorName
        );

        const lastLog = sensorBucket.lastLog.hits.hits[0];
        const lastLogData = lastLog._source.document;

        const sensorState = {
            sensorName,
            hexColor: sensorMetaData.hexColor,
            lastSyncDateUnix: sensorMetaData.lastSyncDateUnix,
            lastAlertDateUnix: sensorMetaData.lastAlertDateUnix,
            lastLogData
        };

        sensors.push(sensorState);
    }

    return { sensors };
};
