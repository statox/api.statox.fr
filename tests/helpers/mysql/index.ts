import { TestHelper } from '../TestHelper';
import { mysqlCheckContains } from './mysqlCheckContains';
import { mysqlCheckDoesNotContain } from './mysqlCheckDoesNotContain';
import { mysqlCheckTableLength } from './mysqlCheckTableLength';
import { mysqlClearAllTables } from './mysqlClearTables';
import { mysqlDumpTables } from './mysqlDumpTables';
import { mysqlFixture } from './mysqlFixture';
import { aroundNowSec, nowSec } from './mysqlTimeHelpers';

export {
    aroundNowSec,
    mysqlCheckContains,
    mysqlCheckDoesNotContain,
    mysqlCheckTableLength,
    mysqlDumpTables,
    mysqlFixture,
    nowSec
};

export const testHelper_Mysql = new TestHelper({
    name: 'MySQL',
    hooks: {
        beforeEach: mysqlClearAllTables
    }
});
