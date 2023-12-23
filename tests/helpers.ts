import * as mysql from 'mysql';
import { db } from '../src/services/db';

export const listAllTables = () => {
    return new Promise<string[]>((resolve, reject) => {
        db.query('SHOW TABLES', (err, rows) => {
            if (err) {
                reject(err);
            }
            const tables = rows.map((row: { Tables_in_tests: string }) => row.Tables_in_tests);
            resolve(tables);
        });
    });
};

export const clearMysqlTables = async () => {
    const tables = await listAllTables();
    const queries = tables
        .map((table) => `TRUNCATE TABLE ${table};`)
        .map((query) => {
            return new Promise<void>((resolve, reject) => {
                db.query(query, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    return Promise.all(queries);
};

type MysqlFixture = {
    [table: string]: { [column: string]: unknown }[];
};

export const mysqlFixture = (fixture: MysqlFixture) => {
    const fixturePromises: Promise<void>[] = [];
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
                    rowValues.push(mysql.raw('default'));
                } else {
                    rowValues.push(row[column]);
                }
            }
            values.push(rowValues);
        }

        const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES ?;`;
        const promise = new Promise<void>((resolve, reject) => {
            db.query(query, [values], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        fixturePromises.push(promise);
    }

    return Promise.all(fixturePromises);
};

export const mysqlDumpTables = (tables: string[] | string) => {
    if (!Array.isArray(tables)) {
        tables = [tables];
    }

    const fixturePromises: Promise<void>[] = [];
    for (const table of tables) {
        const promise = new Promise<void>((resolve, reject) => {
            const query = `SELECT * FROM ${table}`;
            db.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                console.log(`Content of ${table}`);
                console.log(rows);
                resolve();
            });
        });

        fixturePromises.push(promise);
    }

    return Promise.all(fixturePromises);
};
