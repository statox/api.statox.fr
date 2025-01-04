import { db } from '../../../databases/db.js';

type NewEntryParams = {
    eventType: string;
    eventValue?: number;
};

export const addEntry = async (newEntry: NewEntryParams) => {
    const { eventType, eventValue } = newEntry;

    await db.query(
        `INSERT INTO PersonalTracker (type, value, eventDateUnix) VALUES (?, ?, UNIX_TIMESTAMP())`,
        [eventType, eventValue]
    );
};
