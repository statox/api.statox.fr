import { db } from '../../../databases/db.js';
import { PersonalEvent } from '../types.js';

export const addEntry = async (event: PersonalEvent) => {
    const { timestampUTC, type, value } = event;

    await db.query(
        `INSERT INTO PersonalTracker (type, value, eventDateUnix)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE value = ?`,
        [type, value, timestampUTC, value]
    );
};
