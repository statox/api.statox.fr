import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../../databases/db.js';
import { PersonalEvent } from '../types.js';

export const getAllEntries = async (): Promise<PersonalEvent[]> => {
    const [rows] = await db.query<(PersonalEvent & RowDataPacket)[]>(
        `SELECT eventDateUnix, type, value, data FROM PersonalTracker ORDER BY eventDateUnix DESC`
    );
    return rows;
};
