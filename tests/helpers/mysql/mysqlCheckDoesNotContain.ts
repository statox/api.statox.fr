import { RowDataPacket } from 'mysql2';
import { MysqlCheckData, TableCheck } from './types.js';
import { db } from '../../../src/libs/databases/db.js';

const checkTableDoesNotContain = async (table: string, checks: TableCheck[]) => {
    for (const row of checks) {
        const conditions = [];
        const values: unknown[] = [];
        for (const column in row) {
            const value = row[column];

            if (typeof value === 'object') {
                if (Buffer.isBuffer(value)) {
                    conditions.push(`${column} = ?`);
                } else if (value?.aroundTimestamp && value?.precision) {
                    const condition = `${column} BETWEEN
UNIX_TIMESTAMP(CAST(${value.aroundTimestamp} - INTERVAL ${value.precision} AS DATETIME))
AND
UNIX_TIMESTAMP(CAST(${value.aroundTimestamp} + INTERVAL ${value.precision} AS DATETIME))`;
                    conditions.push(condition);
                } else {
                    throw new Error('Invalid mysql value');
                }
            } else {
                conditions.push(`${column} = ?`);
                values.push(row[column]);
            }
        }
        const conditionQuery = conditions.join(' AND ');
        const query = `SELECT * FROM ${table} WHERE ${conditionQuery};`;

        const [rows] = await db.query<RowDataPacket[]>(query, values);
        if (rows.length) {
            throw new Error(`${JSON.stringify(row, null, 2)} found in ${table}`);
        }
    }
};

// TODO Refactor to have common logic with mysqlCheckContains
export const mysqlCheckDoesNotContain = async (data: MysqlCheckData) => {
    for (const table of Object.keys(data)) {
        const checks = data[table];

        if (!checks.length) {
            continue;
        }

        await checkTableDoesNotContain(table, checks);
    }
};
