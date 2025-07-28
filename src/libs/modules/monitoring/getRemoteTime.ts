import { RowDataPacket } from 'mysql2';
import { db } from '../../databases/db.js';

export const getNowSec = async () => {
    const [entries] = await db.query<({ ts: number } & RowDataPacket)[]>(
        `SELECT UNIX_TIMESTAMP() AS ts;`
    );
    return entries[0].ts;
};
