import { elk } from '../../../databases/elk.js';
import { pushNotifier, slackNotifier } from '../../notifier/index.js';
import { monitoredSensorNames } from '../config.js';

const missingSensorLogs_alertedSensors = new Set();

export const doHomeTrackerMonitoring = async () => {
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
