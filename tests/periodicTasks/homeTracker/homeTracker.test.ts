import { DateTime } from 'luxon';
import { doHomeTrackerMonitoring } from '../../../src/libs/modules/homeTracker/index.js';
import { th } from '../../helpers/index.js';

const tenMinutesAgo = Math.round(Date.now() / 1000) - 10 * 60;
const thirtyMinutesAgo = Math.round(Date.now() / 1000) - 30 * 60;

describe('periodic task - doHomeTrackerMonitoring', () => {
    it('Not monitored - Do nothing', async () => {
        await th.mysql.fixture({
            HomeTrackerSensor: [
                { name: 'salon', isMonitored: false, lastSyncDateUnix: thirtyMinutesAgo }
            ]
        });

        await doHomeTrackerMonitoring();
        th.push.checkNbNotifications(0);
        await th.mysql.checkContains({
            HomeTrackerSensor: [
                {
                    name: 'salon',
                    isMonitored: false,
                    lastSyncDateUnix: thirtyMinutesAgo,
                    lastAlertDateUnix: null
                }
            ]
        });
    });

    it('Last sync 30 minutes ago - Notify', async () => {
        await th.mysql.fixture({
            HomeTrackerSensor: [
                // Remove 30 seconds to avoid flaky in minutes computation
                { name: 'salon', isMonitored: true, lastSyncDateUnix: thirtyMinutesAgo - 30 }
            ]
        });

        await doHomeTrackerMonitoring();

        th.slog.checkLog('home-tracker', 'No data', {
            sensorName: 'salon',
            lastSyncDateUnix: thirtyMinutesAgo - 30
        });

        const expectedMessage = `🔴 salon - No data for 30 mn`;
        th.push.checkNotification({ title: 'Home Tracker', message: expectedMessage });
        th.push.checkNbNotifications(1);
        await th.mysql.checkContains({
            HomeTrackerSensor: [
                {
                    name: 'salon',
                    isMonitored: true,
                    lastSyncDateUnix: thirtyMinutesAgo - 30,
                    lastAlertDateUnix: th.mysql.aroundNowSec
                }
            ]
        });

        // On second call we shouldn't create another notification for the failing sensor
        await doHomeTrackerMonitoring();
        th.push.checkNbNotifications(1);
    });

    it('Last sync 30 minutes ago, previously alerted - Do nothing', async () => {
        await th.mysql.fixture({
            HomeTrackerSensor: [
                {
                    name: 'salon',
                    isMonitored: true,
                    lastSyncDateUnix: thirtyMinutesAgo,
                    lastAlertDateUnix: tenMinutesAgo
                }
            ]
        });

        await doHomeTrackerMonitoring();
        th.slack.checkNbNotifications(0);
        th.push.checkNbNotifications(0);
    });

    it('Last sync 10 minutes ago - Do nothing', async () => {
        await th.mysql.fixture({
            HomeTrackerSensor: [
                {
                    name: 'salon',
                    isMonitored: true,
                    lastSyncDateUnix: tenMinutesAgo,
                    lastAlertDateUnix: null
                }
            ]
        });
        await th.elk.flush();
        await th.elk.fixture({
            'data-home-tracker': [
                {
                    '@timestamp': DateTime.now().minus({ minute: 10 }).toMillis(),
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 21
                    }
                }
            ]
        });

        await doHomeTrackerMonitoring();
        th.slack.checkNbNotifications(0);
        th.push.checkNbNotifications(0);
    });

    it('Last sync 10 minutes ago, previously alerted - Notify', async () => {
        await th.mysql.fixture({
            HomeTrackerSensor: [
                {
                    name: 'salon',
                    isMonitored: true,
                    lastSyncDateUnix: tenMinutesAgo,
                    lastAlertDateUnix: thirtyMinutesAgo
                }
            ]
        });
        await th.elk.flush();
        await th.elk.fixture({
            'data-home-tracker': [
                {
                    '@timestamp': DateTime.now().minus({ minute: 10 }).toMillis(),
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 21
                    }
                }
            ]
        });

        await doHomeTrackerMonitoring();

        await th.mysql.checkContains({
            HomeTrackerSensor: [
                {
                    name: 'salon',
                    isMonitored: true,
                    lastSyncDateUnix: tenMinutesAgo,
                    lastAlertDateUnix: null
                }
            ]
        });

        th.slog.checkLog('home-tracker', 'Back online', {
            sensorName: 'salon',
            lastAlertDateUnix: thirtyMinutesAgo
        });

        const expectedMessage = `🟢 salon - Back online after 30 mn`;
        th.push.checkNotification({ title: 'Home Tracker', message: expectedMessage });
        th.push.checkNbNotifications(1);
    });

    it('Last sync 10 minutes ago, no logs - Notify', async () => {
        await th.mysql.fixture({
            HomeTrackerSensor: [
                {
                    name: 'salon',
                    isMonitored: true,
                    lastSyncDateUnix: tenMinutesAgo,
                    lastAlertDateUnix: null
                }
            ]
        });
        await th.elk.flush();

        await doHomeTrackerMonitoring();

        th.slog.checkLog('home-tracker', 'Sync without data', { sensorName: 'salon' });
        const expectedMessage = '🔴 salon - Sync without data';
        th.push.checkNotification({ title: 'Home Tracker', message: expectedMessage });
        th.push.checkNbNotifications(1);
    });
});
