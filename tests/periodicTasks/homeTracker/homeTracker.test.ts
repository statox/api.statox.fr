import { doHomeTrackerMonitoring, ingestSensorData } from '../../../src/libs/modules/homeTracker';
import { testHelper_SlackNotifier } from '../../helpers/notifier/slack';

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

        testHelper_SlackNotifier.checkNotification({
            message: 'Missing home tracker data for sensor jardiniere',
            directMention: true
        });
        testHelper_SlackNotifier.checkNbNotifications(1);

        // On second call we shouldn't create another notification for the failing sensor
        await doHomeTrackerMonitoring();
        testHelper_SlackNotifier.checkNbNotifications(1);
    });
});
