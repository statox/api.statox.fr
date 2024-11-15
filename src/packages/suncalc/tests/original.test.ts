import { assert } from 'chai';
import * as SunCalc from '../index.js';

/*
 * This file is the port of the test file in the original repo
 * https://github.com/mourner/suncalc/blob/6bc2757/test.js
 *
 * It adds typescript support and uses mocha+chai instead of tape
 */

function isNear(val1: number, val2: number, message: string) {
    const margin = 1e-15;
    assert.closeTo(val1, val2, margin, message);
}

const date = new Date('2013-03-05UTC');
const lat = 50.5;
const lng = 30.5;
const height = 2000;

const testTimes: Record<string, string> = {
    solarNoon: '2013-03-05T10:10:57Z',
    nadir: '2013-03-04T22:10:57Z',
    sunrise: '2013-03-05T04:34:56Z',
    sunset: '2013-03-05T15:46:57Z',
    sunriseEnd: '2013-03-05T04:38:19Z',
    sunsetStart: '2013-03-05T15:43:34Z',
    dawn: '2013-03-05T04:02:17Z',
    dusk: '2013-03-05T16:19:36Z',
    nauticalDawn: '2013-03-05T03:24:31Z',
    nauticalDusk: '2013-03-05T16:57:22Z',
    nightEnd: '2013-03-05T02:46:17Z',
    night: '2013-03-05T17:35:36Z',
    goldenHourEnd: '2013-03-05T05:19:01Z',
    goldenHour: '2013-03-05T15:02:52Z'
};

const heightTestTimes: Record<string, string> = {
    solarNoon: '2013-03-05T10:10:57Z',
    nadir: '2013-03-04T22:10:57Z',
    sunrise: '2013-03-05T04:25:07Z',
    sunset: '2013-03-05T15:56:46Z'
};

describe('SunCalc - original tests', () => {
    describe('getPosition', () => {
        it('returns azimuth and altitude for the given time and location', () => {
            const sunPos = SunCalc.getPosition(date, lat, lng);

            isNear(sunPos.azimuth, -2.5003175907168385, 'azimuth');
            isNear(sunPos.altitude, -0.7000406838781611, 'altitude');
        });
    });

    describe('getTimes', () => {
        it('returns sun phases for the given date and location', () => {
            const times = SunCalc.getTimes(date, lat, lng);

            for (const i in testTimes) {
                assert.equal(new Date(testTimes[i]).toUTCString(), times[i].toUTCString(), i);
            }
        });

        it('adjusts sun phases when additionally given the observer height', () => {
            const times = SunCalc.getTimes(date, lat, lng, height);

            for (const i in heightTestTimes) {
                assert.equal(new Date(heightTestTimes[i]).toUTCString(), times[i].toUTCString(), i);
            }
        });
    });

    describe('getMoonPosition', () => {
        it('returns moon position data given time and location', () => {
            const moonPos = SunCalc.getMoonPosition(date, lat, lng);

            isNear(moonPos.azimuth, -0.9783999522438226, 'azimuth');
            isNear(moonPos.altitude, 0.014551482243892251, 'altitude');
            isNear(moonPos.distance, 364121.37256256194, 'distance');
        });
    });

    describe('getMoonIllumination', () => {
        it("returns fraction and angle of moon's illuminated limb and phase", () => {
            const moonIllum = SunCalc.getMoonIllumination(date);

            isNear(moonIllum.fraction, 0.4848068202456373, 'fraction');
            isNear(moonIllum.phase, 0.7548368838538762, 'phase');
            isNear(moonIllum.angle, 1.6732942678578346, 'angle');
        });
    });

    describe('getMoonTimes', () => {
        it('returns moon rise and set times', () => {
            const moonTimes = SunCalc.getMoonTimes(new Date('2013-03-04UTC'), lat, lng, true);

            assert.equal(moonTimes.rise?.toUTCString(), 'Mon, 04 Mar 2013 23:54:29 GMT');
            assert.equal(moonTimes.set?.toUTCString(), 'Mon, 04 Mar 2013 07:47:58 GMT');
        });
    });
});
