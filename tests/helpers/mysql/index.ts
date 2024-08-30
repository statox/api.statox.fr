import { DateTime } from 'luxon';
import { TestHelper } from '../TestHelper';
import { mysqlCheckContains } from './mysqlCheckContains';
import { mysqlCheckDoesNotContain } from './mysqlCheckDoesNotContain';
import { mysqlCheckTableLength } from './mysqlCheckTableLength';
import { mysqlClearAllTables } from './mysqlClearTables';
import { mysqlDumpTables } from './mysqlDumpTables';
import { mysqlFixture } from './mysqlFixture';
import { MysqlCheckData, MysqlFixture } from './types';

class TestHelper_MySQL extends TestHelper {
    mysqlCheckContains: (data: MysqlCheckData) => Promise<void>;
    mysqlCheckDoesNotContain: (data: MysqlCheckData) => Promise<void>;
    mysqlCheckTableLength: (tableName: string, expectedTableLength: number) => Promise<void>;
    mysqlDumpTables: (tables: string[] | string) => Promise<void>;
    mysqlFixture: (fixture: MysqlFixture) => Promise<void>;

    constructor() {
        super({
            name: 'MySQL',
            hooks: {
                beforeEach: mysqlClearAllTables
            }
        });

        this.mysqlCheckContains = mysqlCheckContains;
        this.mysqlCheckDoesNotContain = mysqlCheckDoesNotContain;
        this.mysqlCheckTableLength = mysqlCheckTableLength;
        this.mysqlDumpTables = mysqlDumpTables;
        this.mysqlFixture = mysqlFixture;
    }

    aroundNowSec = {
        aroundTimestamp: 'NOW()',
        precision: '1 SECOND'
    };

    nowSec = () => Math.floor(DateTime.now().toSeconds());
}
export const testHelper_Mysql = new TestHelper_MySQL();
