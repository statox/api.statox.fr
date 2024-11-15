import { DateTime } from 'luxon';
import { TestHelper } from '../TestHelper.js';
import { mysqlCheckContains } from './mysqlCheckContains.js';
import { mysqlCheckDoesNotContain } from './mysqlCheckDoesNotContain.js';
import { mysqlCheckTableLength } from './mysqlCheckTableLength.js';
import { mysqlClearAllTables } from './mysqlClearTables.js';
import { mysqlDumpTables } from './mysqlDumpTables.js';
import { mysqlFixture } from './mysqlFixture.js';
import { MysqlCheckData, MysqlFixture } from './types.js';

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
