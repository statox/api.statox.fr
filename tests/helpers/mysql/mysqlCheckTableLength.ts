import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../../src/libs/databases/db';
import { assert } from 'chai';

export const mysqlCheckTableLength = async (tableName: string, expectedTableLength: number) => {
    const query = `SELECT count(*) as nbRows from ${tableName}`;
    const [count] = await db.query<RowDataPacket[]>(query);
    const actualTableLength = count[0].nbRows;

    assert.equal(actualTableLength, expectedTableLength, `Table ${tableName} length unexpected`);
};
