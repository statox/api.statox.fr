import sinon from 'sinon';
import { DateTime } from 'luxon';
import { TestHelper } from '../TestHelper';
import { assert } from 'chai';

let sinonDateTimeNowStub: sinon.SinonStub | undefined;

class TestHelper_Time extends TestHelper {
    constructor() {
        super({
            name: 'Time',
            hooks: {}
        });
    }

    fakeSinonDateTimeNow = (newNowTs: number) => {
        const newNow = DateTime.fromSeconds(newNowTs);
        sinonDateTimeNowStub = sinon.stub(DateTime, 'now');
        sinonDateTimeNowStub.returns(newNow);
    };

    restoreDateTimeNow = () => {
        sinonDateTimeNowStub?.restore();
        sinonDateTimeNowStub = undefined;
    };

    isAroundNowSec = (ts: number, maxDelayInSeconds = 2) => {
        const diffFromNow = DateTime.fromSeconds(ts).diffNow('seconds').seconds;
        assert.isAtMost(
            Math.abs(diffFromNow),
            maxDelayInSeconds,
            `timestamp in seconds is not around now ${ts}`
        );
    };
}

export const testHelper_Time = new TestHelper_Time();
