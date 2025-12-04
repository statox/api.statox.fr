import { db } from '../../../databases/db.js';
import { PersonalEvent } from '../types.js';

export const addEntry = async (event: PersonalEvent) => {
    const { timestampUTC, type, value = -1, data = {} } = event;
    const dataStr = JSON.stringify(data);

    await db.query(
        `INSERT INTO PersonalTracker (type, value, data, eventDateUnix)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE value = ?, data = ?`,
        [type, value, dataStr, timestampUTC, value, dataStr]
    );
};
