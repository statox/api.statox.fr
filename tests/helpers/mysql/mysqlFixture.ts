import { raw } from 'mysql2';
import { db } from '../../../src/libs/databases/db';
import { MysqlFixture } from './types';

export const mysqlFixture = async (fixture: MysqlFixture) => {
    for (const table of Object.keys(fixture)) {
        const rows = fixture[table];

        if (!rows.length) {
            continue;
        }

        const columns: string[] = [];
        const values: unknown[][] = [];
        for (const row of rows) {
            for (const column in row) {
                if (columns.includes(column)) {
                    continue;
                }
                columns.push(column);
            }
        }

        for (const row of rows) {
            const rowValues = [];
            for (const column of columns) {
                if (row[column] === undefined) {
                    rowValues.push(raw('default'));
                } else {
                    rowValues.push(row[column]);
                }
            }
            values.push(rowValues);
        }

        const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES ?;`;
        await db.query(query, [values]);
    }
};
