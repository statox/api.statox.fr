import { elk } from '../../databases/elk';
import { notifySlack } from '../notifier/slack';

const missingSensorLogs_alertedSensors = new Set();

export const doHomeTrackerMonitoring = async () => {
    const monitoredSensorNames = ['salon', 'jardiniere'];

    for (const sensorName of monitoredSensorNames) {
        const result = await elk.search<{ sensorName: string }>({
            index: 'data-home-tracker',
            query: {
                // TODO check the type issue here
                // @ts-expect-error: Not sure why the typing is not happy here but the query works
                bool: {
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
                await notifySlack({
                    message: 'Missing home tracker data for sensor ' + sensorName,
                    directMention: true
                });
                missingSensorLogs_alertedSensors.add(sensorName);
            }
        } else {
            missingSensorLogs_alertedSensors.delete(sensorName);
        }
    }
};
