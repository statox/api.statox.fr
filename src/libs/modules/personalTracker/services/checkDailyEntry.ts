import { DateTime } from 'luxon';
import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../../databases/db.js';
import { pushNotifier } from '../../notifier/index.js';
import { slog } from '../../logging/index.js';
import { MONITORED_USER_ID, REMINDER_HOUR } from '../config.js';

type PersonalTrackerEntry = {
    id: number;
};

type ReminderState = {
    lastReminderDateUnix: number;
};

const checkForTodayEntry = async (
    userId: number,
    todayStartOfDayUnix: number
): Promise<boolean> => {
    const [rows] = await db.query<(PersonalTrackerEntry & RowDataPacket)[]>(
        `SELECT id FROM PersonalTracker WHERE userId = ? AND eventDateUnix = ?`,
        [userId, todayStartOfDayUnix]
    );

    return rows.length > 0;
};

const getLastReminderDate = async (userId: number): Promise<number | null> => {
    const [rows] = await db.query<(ReminderState & RowDataPacket)[]>(
        `SELECT lastReminderDateUnix FROM PersonalTrackerReminderState WHERE userId = ?`,
        [userId]
    );

    return rows.length > 0 ? rows[0].lastReminderDateUnix : null;
};

const updateReminderDate = async (userId: number, dateUnix: number): Promise<void> => {
    await db.query(
        `INSERT INTO PersonalTrackerReminderState (userId, lastReminderDateUnix)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE lastReminderDateUnix = VALUES(lastReminderDateUnix)`,
        [userId, dateUnix]
    );
};

export const doPersonalTrackerReminder = async () => {
    const now = DateTime.now();
    const currentHour = now.hour;

    // Only check after 21:00
    if (currentHour < REMINDER_HOUR) {
        return;
    }

    const todayStartOfDayUnix = now.startOf('day').toUnixInteger();

    // Check if user already created an entry for today
    const hasEntryForToday = await checkForTodayEntry(MONITORED_USER_ID, todayStartOfDayUnix);
    if (hasEntryForToday) {
        return;
    }

    // Check if we already sent a reminder today
    const lastReminderDate = await getLastReminderDate(MONITORED_USER_ID);
    if (lastReminderDate === todayStartOfDayUnix) {
        return;
    }

    // Send reminder
    const message = "Don't forget to track today!";
    await pushNotifier.notify({
        title: 'Personal Tracker',
        message
    });

    slog.log('periodic-tasks', 'Personal tracker reminder sent', {
        userId: MONITORED_USER_ID
    });

    // Update reminder state
    await updateReminderDate(MONITORED_USER_ID, todayStartOfDayUnix);
};
