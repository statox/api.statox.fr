import { RowDataPacket } from 'mysql2';
import { db } from '../../../src/services/env-helpers/db';

const listAllTables = async () => {
    const [rows] = await db.query<RowDataPacket[]>('SHOW TABLES');
    const tables = rows.map((row) => row.Tables_in_tests);
    return tables;
};

export const mysqlClearAllTables = async () => {
    const tables = await listAllTables();
    for (const table of tables) {
        await db.query(`TRUNCATE TABLE ${table};`);
    }
};
