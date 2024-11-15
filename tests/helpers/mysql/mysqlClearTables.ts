import { RowDataPacket } from 'mysql2';
import { db } from '../../../src/libs/databases/db.js';

let allTables: string[];
const listAllTables = async () => {
    if (allTables) {
        return allTables;
    }
    const [rows] = await db.query<RowDataPacket[]>('SHOW TABLES');
    const tables = rows.map((row) => row.Tables_in_tests);
    allTables = tables;
    return tables;
};

export const mysqlClearAllTables = async () => {
    const tables = await listAllTables();
    const promises = tables.map((table) => db.query(`TRUNCATE TABLE ${table};`));
    await Promise.all(promises);
};
