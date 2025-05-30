import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../../databases/db.js';
import { elk } from '../../../databases/elk.js';
import { pushNotifier } from '../../notifier/index.js';
import { slog } from '../../logging/index.js';

type MonitoredSensorsResult = {
    name: string;
    lastSyncDateUnix: number;
    lastAlertDateUnix: null | number;
};

const getMonitoredSensors = async (): Promise<MonitoredSensorsResult[]> => {
    const [rows] = await db.query<(MonitoredSensorsResult & RowDataPacket)[]>(
        `SELECT name, lastSyncDateUnix, lastAlertDateUnix
        FROM HomeTrackerSensor
        WHERE isMonitored is true
    `
    );

    return rows;
};

const setSensorAlertDate = (sensorName: string) =>
    db.query(`UPDATE HomeTrackerSensor SET lastAlertDateUnix = UNIX_TIMESTAMP() WHERE name = ?`, [
        sensorName
    ]);
const unsetSensorAlertDate = (sensorName: string) =>
    db.query(`UPDATE HomeTrackerSensor SET lastAlertDateUnix = null WHERE name = ?`, [sensorName]);

const getLast30MinutesLogsForSensor = (sensorName: string) =>
    elk.search<{ sensorName: string }>({
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

const MAX_SEC_WITHOUT_SYNC = 20 * 60;
export const doHomeTrackerMonitoring = async () => {
    const monitoredSensors = await getMonitoredSensors();

    for (const sensor of monitoredSensors) {
        const { lastSyncDateUnix, name, lastAlertDateUnix } = sensor;
        const secondsSinceLastSync = Date.now() / 1000 - lastSyncDateUnix;
        const isInAlert = lastAlertDateUnix != null;

        if (secondsSinceLastSync > MAX_SEC_WITHOUT_SYNC) {
            // Alert if sensor had not been alerted before
            if (!isInAlert) {
                const message = `🔴 ${name} - No data for ${Math.floor(secondsSinceLastSync / 60)} mn`;
                slog.log('home-tracker', 'No data', { sensorName: name, lastSyncDateUnix });
                await pushNotifier.notify({ title: 'Home Tracker', message });
                await setSensorAlertDate(name);
            }
            continue;
        }

        // Info if sensor is back online
        if (isInAlert) {
            const secondsSinceLastAlert = Date.now() / 1000 - lastAlertDateUnix;
            const message = `🟢 ${name} - Back online after ${Math.floor(secondsSinceLastAlert / 60)} mn`;
            slog.log('home-tracker', 'Back online', { sensorName: name, lastAlertDateUnix });
            await pushNotifier.notify({ title: 'Home Tracker', message });
            await unsetSensorAlertDate(name);
        }

        const result = await getLast30MinutesLogsForSensor(name);

        // TODO I should be using result.hits.total but for a reason
        // I don't understand the typing is broken
        const nbLogs = result.hits.hits.length;

        // Message if we received a sync but couldn't store a log
        if (nbLogs < 1) {
            if (!isInAlert) {
                const message = `🔴 ${name} - Sync without data`;
                slog.log('home-tracker', 'Sync without data', { sensorName: name });
                await pushNotifier.notify({ title: 'Home Tracker', message });
                await setSensorAlertDate(name);
            }
        }
    }
};
