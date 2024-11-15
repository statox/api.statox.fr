import { DateTime } from 'luxon';
import { doHomeTrackerMonitoring } from '../../../src/libs/modules/homeTracker/index.js';
import { th } from '../../helpers/index.js';

describe('periodic task - doHomeTrackerMonitoring', () => {
    it('Should create a notification for missing sensor data, and should notify only once', async () => {
        await th.elk.flush();
        await th.elk.fixture({
            'data-home-tracker': [
                // Salon: 2 very recent logs, should not alert
                {
                    '@timestamp': DateTime.now().toMillis(),
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 21
                    }
                },
                {
                    '@timestamp': DateTime.now().minus({ minutes: 10 }).toMillis(),
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 22
                    }
                },
                // Chambre: 2 logs in the past 30 minutes, should not alert
                {
                    '@timestamp': DateTime.now().minus({ minutes: 20 }).toMillis(),
                    document: {
                        sensorName: 'chambre',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 21
                    }
                },
                {
                    '@timestamp': DateTime.now().minus({ minutes: 29 }).toMillis(),
                    document: {
                        sensorName: 'chambre',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 22
                    }
                },
                // jardiniere: only one log in the past 30 minutes and one older one, should alert
                {
                    '@timestamp': DateTime.now().minus({ minutes: 1 }).toMillis(),
                    document: {
                        sensorName: 'jardiniere',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 22
                    }
                },
                {
                    '@timestamp': DateTime.now().minus({ hours: 1 }).toMillis(),
                    document: {
                        sensorName: 'jardiniere',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 22
                    }
                }
            ]
        });

        await doHomeTrackerMonitoring();

        th.slack.checkNotification({
            message: 'Missing home tracker data for sensor jardiniere',
            directMention: true
        });
        th.slack.checkNotification({
            message: 'Missing home tracker data for sensor sdb',
            directMention: true
        });
        th.slack.checkNbNotifications(2);

        // On second call we shouldn't create another notification for the failing sensor
        await doHomeTrackerMonitoring();
        th.slack.checkNbNotifications(2);
    });
});
