import { doHomeTrackerMonitoring, ingestSensorData } from '../../../src/libs/modules/homeTracker';
import { slackCheckNbNotifications, slackCheckNotification } from '../../helpers/notifier/slack';

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

        slackCheckNotification({
            message: 'Missing home tracker data for sensor jardiniere',
            directMention: true
        });
        slackCheckNbNotifications(1);

        // On second call we shouldn't create another notification for the failing sensor
        await doHomeTrackerMonitoring();
        slackCheckNbNotifications(1);
    });
});
