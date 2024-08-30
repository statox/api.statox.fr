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
    checkContains: (data: MysqlCheckData) => Promise<void>;
    checkDoesNotContain: (data: MysqlCheckData) => Promise<void>;
    checkTableLength: (tableName: string, expectedTableLength: number) => Promise<void>;
    dumpTables: (tables: string[] | string) => Promise<void>;
    fixture: (fixture: MysqlFixture) => Promise<void>;

    constructor() {
        super({
            name: 'MySQL',
            hooks: {
                beforeEach: mysqlClearAllTables
            }
        });

        this.checkContains = mysqlCheckContains;
        this.checkDoesNotContain = mysqlCheckDoesNotContain;
        this.checkTableLength = mysqlCheckTableLength;
        this.dumpTables = mysqlDumpTables;
        this.fixture = mysqlFixture;
    }

    aroundNowSec = {
        aroundTimestamp: 'NOW()',
        precision: '1 SECOND'
    };

    nowSec = () => Math.floor(DateTime.now().toSeconds());
}
export const testHelper_Mysql = new TestHelper_MySQL();
