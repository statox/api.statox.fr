import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../../databases/db.js';
import { elk } from '../../../databases/elk.js';
import { pushNotifier, slackNotifier } from '../../notifier/index.js';

const missingSensorLogs_alertedSensors = new Set();

type MonitoredSensorsResult = {
    name: string;
} & RowDataPacket;

const getMonitoredSensorsName = async (): Promise<string[]> => {
    const [rows] = await db.query<MonitoredSensorsResult[]>(
        `SELECT name
        FROM HomeTrackerSensor
        WHERE isMonitored is true
    `
    );

    return rows.map((r) => r.name);
};

export const doHomeTrackerMonitoring = async () => {
    const monitoredSensorNames = await getMonitoredSensorsName();

    for (const sensorName of monitoredSensorNames) {
        const result = await elk.search<{ sensorName: string }>({
            index: 'data-home-tracker',
            query: {
                bool: {
                    should: [],
                    must: [
                        {
                            term: {
                                'document.sensorName': {
                                    value: sensorName
                                }
                            }
                        },
                        {
                            range: {
                                '@timestamp': {
                                    gte: 'now-30m'
                                }
                            }
                        }
                    ]
                }
            }
        });

        // TODO I should be using result.hits.total but for a reason
        // I don't understand the typing is broken
        const nbLogs = result.hits.hits.length;

        if (nbLogs < 2) {
            if (!missingSensorLogs_alertedSensors.has(sensorName)) {
                await slackNotifier.notifySlack({
                    message: 'Missing home tracker data for sensor ' + sensorName,
                    directMention: true
                });
                await pushNotifier.notify({
                    title: 'Home Tracker',
                    message: 'Missing home tracker data for sensor ' + sensorName
                });
                missingSensorLogs_alertedSensors.add(sensorName);
            }
        } else {
            missingSensorLogs_alertedSensors.delete(sensorName);
        }
    }
};
