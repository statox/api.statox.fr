import { doHomeTrackerMonitoring, ingestSensorData } from '../../../src/libs/modules/homeTracker';
import { th } from '../../helpers';

describe('periodic task - doHomeTrackerMonitoring', () => {
    it('Should create a notification for missing sensor data, and should notify only once', async () => {
        await ingestSensorData({
            sensorName: 'salon',
            batteryCharge: 4.2,
            batteryPercent: 100,
            humidity: 30,
            tempCelsius: 21
        });
        await ingestSensorData({
            sensorName: 'salon',
            batteryCharge: 4.2,
            batteryPercent: 100,
            humidity: 30,
            tempCelsius: 22
        });

        await doHomeTrackerMonitoring();

        th.slack.checkNotification({
            message: 'Missing home tracker data for sensor jardiniere',
            directMention: true
        });
        th.slack.checkNbNotifications(1);

        // On second call we shouldn't create another notification for the failing sensor
        await doHomeTrackerMonitoring();
        th.slack.checkNbNotifications(1);
    });
});
