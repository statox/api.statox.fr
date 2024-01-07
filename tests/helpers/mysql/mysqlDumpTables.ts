import { RowDataPacket } from 'mysql2';
import { db } from '../../../src/services/db';

export const mysqlDumpTables = async (tables: string[] | string) => {
    if (!Array.isArray(tables)) {
        tables = [tables];
    }

    for (const table of tables) {
        const query = `SELECT * FROM ${table}`;
        const [rows] = await db.query<RowDataPacket[]>(query);
        console.log(`Content of ${table}`);
        console.log(rows);
    }
};
