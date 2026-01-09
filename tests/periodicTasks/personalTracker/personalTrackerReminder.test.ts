import { DateTime } from 'luxon';
import { doPersonalTrackerReminder } from '../../../src/libs/modules/personalTracker/index.js';
import { MONITORED_USER_ID } from '../../../src/libs/modules/personalTracker/config.js';
import { th } from '../../helpers/index.js';

describe('periodic task - doPersonalTrackerReminder', () => {
    afterEach(() => {
        th.time.restoreDateTimeNow();
    });

    it('Before 21:00 - Do nothing', async () => {
        // Mock time to 20:59 on a specific day
        const testDate = DateTime.fromISO('2026-01-15T20:59:00.000Z');
        th.time.fakeSinonDateTimeNow(testDate.toUnixInteger());

        await doPersonalTrackerReminder();

        th.push.checkNoNotifications();
        th.slog.checkNoLogs();
    });

    it('After 21:00, no entry for today - Send notification', async () => {
        // Mock time to 21:30
        const testDate = DateTime.fromISO('2026-01-15T21:30:00.000Z');
        th.time.fakeSinonDateTimeNow(testDate.toUnixInteger());

        await doPersonalTrackerReminder();

        th.push.checkNotification({
            title: 'Personal Tracker',
            message: "Don't forget to track today!"
        });
        th.push.checkNbNotifications(1);

        th.slog.checkLog('periodic-tasks', 'Personal tracker reminder sent', {
            userId: MONITORED_USER_ID
        });

        const todayStartOfDay = testDate.startOf('day').toUnixInteger();
        await th.mysql.checkContains({
            PersonalTrackerReminderState: [
                {
                    userId: MONITORED_USER_ID,
                    lastReminderDateUnix: todayStartOfDay
                }
            ]
        });
    });

    it('After 21:00, entry exists for today - Do nothing', async () => {
        // Mock time to 21:30
        const testDate = DateTime.fromISO('2026-01-15T21:30:00.000Z');
        th.time.fakeSinonDateTimeNow(testDate.toUnixInteger());

        const todayStartOfDay = testDate.startOf('day').toUnixInteger();

        // Create an entry for today
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    userId: MONITORED_USER_ID,
                    eventDateUnix: todayStartOfDay,
                    salt: Buffer.from('a'.repeat(16)),
                    nonce: Buffer.from('b'.repeat(24)),
                    ciphertext: Buffer.from('encrypted')
                }
            ]
        });

        await doPersonalTrackerReminder();

        th.push.checkNoNotifications();
        th.slog.checkNoLogs();
    });

    it('After 21:00, already notified today - Do nothing', async () => {
        // Mock time to 21:30
        const testDate = DateTime.fromISO('2026-01-15T21:30:00.000Z');
        th.time.fakeSinonDateTimeNow(testDate.toUnixInteger());

        const todayStartOfDay = testDate.startOf('day').toUnixInteger();

        // Mark that we already sent a reminder today
        await th.mysql.fixture({
            PersonalTrackerReminderState: [
                {
                    userId: MONITORED_USER_ID,
                    lastReminderDateUnix: todayStartOfDay
                }
            ]
        });

        await doPersonalTrackerReminder();

        th.push.checkNoNotifications();
        th.slog.checkNoLogs();

        // Run again to confirm idempotency
        await doPersonalTrackerReminder();
        th.push.checkNoNotifications();
        th.slog.checkNoLogs();
    });

    it('After 21:00, notified yesterday but not today - Send notification', async () => {
        // Mock time to 21:30
        const testDate = DateTime.fromISO('2026-01-15T21:30:00.000Z');
        th.time.fakeSinonDateTimeNow(testDate.toUnixInteger());

        const todayStartOfDay = testDate.startOf('day').toUnixInteger();
        const yesterdayStartOfDay = testDate.minus({ days: 1 }).startOf('day').toUnixInteger();

        // Mark that we sent a reminder yesterday
        await th.mysql.fixture({
            PersonalTrackerReminderState: [
                {
                    userId: MONITORED_USER_ID,
                    lastReminderDateUnix: yesterdayStartOfDay
                }
            ]
        });

        await doPersonalTrackerReminder();

        th.push.checkNotification({
            title: 'Personal Tracker',
            message: "Don't forget to track today!"
        });
        th.push.checkNbNotifications(1);

        th.slog.checkLog('periodic-tasks', 'Personal tracker reminder sent', {
            userId: MONITORED_USER_ID
        });

        // Verify state updated to today
        await th.mysql.checkContains({
            PersonalTrackerReminderState: [
                {
                    userId: MONITORED_USER_ID,
                    lastReminderDateUnix: todayStartOfDay
                }
            ]
        });
    });

    it("Other users' events don't impact check for monitored user", async () => {
        // Mock time to 21:30
        const testDate = DateTime.fromISO('2026-01-15T21:30:00.000Z');
        th.time.fakeSinonDateTimeNow(testDate.toUnixInteger());

        const todayStartOfDay = testDate.startOf('day').toUnixInteger();

        // Create entries for other users
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    userId: MONITORED_USER_ID + 1,
                    eventDateUnix: todayStartOfDay,
                    salt: Buffer.from('a'.repeat(16)),
                    nonce: Buffer.from('b'.repeat(24)),
                    ciphertext: Buffer.from('encrypted')
                },
                {
                    userId: MONITORED_USER_ID + 2,
                    eventDateUnix: todayStartOfDay,
                    salt: Buffer.from('a'.repeat(16)),
                    nonce: Buffer.from('b'.repeat(24)),
                    ciphertext: Buffer.from('encrypted')
                },
                {
                    userId: MONITORED_USER_ID + 3,
                    eventDateUnix: todayStartOfDay,
                    salt: Buffer.from('a'.repeat(16)),
                    nonce: Buffer.from('b'.repeat(24)),
                    ciphertext: Buffer.from('encrypted')
                }
            ]
        });

        // Monitored user (userId 2) has no entry
        await doPersonalTrackerReminder();

        // Should send notification because monitored user doesn't have an entry
        th.push.checkNotification({
            title: 'Personal Tracker',
            message: "Don't forget to track today!"
        });
        th.push.checkNbNotifications(1);

        th.slog.checkLog('periodic-tasks', 'Personal tracker reminder sent', {
            userId: MONITORED_USER_ID
        });
    });

    it('Cross-midnight behavior - notification resets next day', async () => {
        // Day 1: 21:30, send notification
        const day1 = DateTime.fromISO('2026-01-15T21:30:00.000Z');
        th.time.fakeSinonDateTimeNow(day1.toUnixInteger());

        await doPersonalTrackerReminder();

        th.push.checkNotification({
            title: 'Personal Tracker',
            message: "Don't forget to track today!"
        });
        th.push.checkNbNotifications(1);

        const day1StartOfDay = day1.startOf('day').toUnixInteger();
        await th.mysql.checkContains({
            PersonalTrackerReminderState: [
                {
                    userId: MONITORED_USER_ID,
                    lastReminderDateUnix: day1StartOfDay
                }
            ]
        });

        // Day 2: 21:30, should send new notification
        th.time.restoreDateTimeNow();
        const day2 = DateTime.fromISO('2026-01-16T21:30:00.000Z');
        th.time.fakeSinonDateTimeNow(day2.toUnixInteger());

        await doPersonalTrackerReminder();

        // Should have sent 2 notifications total (1 for day 1, 1 for day 2)
        th.push.checkNbNotifications(2);

        th.slog.checkLog('periodic-tasks', 'Personal tracker reminder sent', {
            userId: MONITORED_USER_ID
        });

        // Verify state updated to day 2
        const day2StartOfDay = day2.startOf('day').toUnixInteger();
        await th.mysql.checkContains({
            PersonalTrackerReminderState: [
                {
                    userId: MONITORED_USER_ID,
                    lastReminderDateUnix: day2StartOfDay
                }
            ]
        });
    });

    it('User has future event - Still send notification for today', async () => {
        // Mock time to 21:30
        const testDate = DateTime.fromISO('2026-01-15T21:30:00.000Z');
        th.time.fakeSinonDateTimeNow(testDate.toUnixInteger());

        const futureDate = testDate.plus({ days: 5 }).startOf('day').toUnixInteger();

        // User has an entry for a future date, but not today
        await th.mysql.fixture({
            PersonalTracker: [
                {
                    userId: MONITORED_USER_ID,
                    eventDateUnix: futureDate,
                    salt: Buffer.from('a'.repeat(16)),
                    nonce: Buffer.from('b'.repeat(24)),
                    ciphertext: Buffer.from('encrypted')
                }
            ]
        });

        await doPersonalTrackerReminder();

        // Should still send notification because no entry for TODAY
        th.push.checkNotification({
            title: 'Personal Tracker',
            message: "Don't forget to track today!"
        });
        th.push.checkNbNotifications(1);

        th.slog.checkLog('periodic-tasks', 'Personal tracker reminder sent', {
            userId: MONITORED_USER_ID
        });
    });
});
