import { assert } from 'chai';
import * as SunCalc from '../index.js';

describe('SunCalc - added tests', () => {
    describe('custom times', () => {
        it('can be added and used properly', () => {
            const getTimesCall = () =>
                SunCalc.getTimes(new Date('2013-03-05T10:10:57Z'), 48.85, 2.35, 100);

            const originalTimesLength = SunCalc.times.length;
            const originalTimes = getTimesCall();

            SunCalc.addTime(10, 'testMorningTime', 'testEveningTime');
            assert.lengthOf(SunCalc.times, originalTimesLength + 1);

            const times = getTimesCall();
            assert.lengthOf(Object.keys(times), Object.keys(originalTimes).length + 2);
            assert.exists(times['testMorningTime']);
            assert.exists(times['testEveningTime']);
        });
    });
});
