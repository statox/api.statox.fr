import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../../src/libs/databases/db.js';
import { ColumnCheckFunction, MysqlCheckData, TableCheck } from './types.js';

const checkTableContains = async (table: string, checks: TableCheck[]) => {
    for (const row of checks) {
        const conditions = [];
        const values: unknown[] = [];

        const columnMatchingFunctions: { [column: string]: ColumnCheckFunction } = {};

        for (const column in row) {
            const value = row[column];

            if (typeof value === 'object') {
                if (Buffer.isBuffer(value)) {
                    conditions.push(`${column} = ?`);
                    values.push(row[column]);
                } else if (value?.aroundTimestamp && value?.precision) {
                    const condition = `${column} BETWEEN
UNIX_TIMESTAMP(CAST(${value.aroundTimestamp} - INTERVAL ${value.precision} AS DATETIME))
AND
UNIX_TIMESTAMP(CAST(${value.aroundTimestamp} + INTERVAL ${value.precision} AS DATETIME))`;
                    conditions.push(condition);
                } else if (value === null) {
                    const condition = `${column} IS NULL`;
                    conditions.push(condition);
                } else {
                    throw new Error('Invalid mysql value');
                }
            } else if (typeof value === 'function') {
                columnMatchingFunctions[column] = value;
            } else {
                conditions.push(`${column} = ?`);
                values.push(row[column]);
            }
        }

        const conditionQuery = conditions.join(' AND ');
        const query = `SELECT * FROM ${table} WHERE ${conditionQuery};`;

        const [rows] = await db.query<RowDataPacket[]>(query, values);

        if (!rows.length) {
            throw new Error(`${JSON.stringify(row, null, 2)} not found in ${table}`);
        }

        const found = rows.filter((resultRow) => {
            return Object.entries(columnMatchingFunctions).every(([column, checkFunction]) => {
                return checkFunction(resultRow[column]);
            });
        });

        if (!found.length) {
            throw new Error(`${JSON.stringify(row, null, 2)} not found in ${table}`);
        }
    }
};

export const mysqlCheckContains = async (data: MysqlCheckData) => {
    for (const table of Object.keys(data)) {
        const checks = data[table];

        if (!checks.length) {
            continue;
        }

        await checkTableContains(table, checks);
    }
};
