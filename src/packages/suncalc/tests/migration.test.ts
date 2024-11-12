import { assert } from 'chai';
import * as SunCalc from '../index';
import { migration_testcases } from './testcases';

/*
 * This file is was created when copying the original SunCalc to this repo
 * and converting it to typescript. The goal was to make sure the behavior
 * remains the same.
 *
 * So we randomly generated 100 dates between 01/01/2000 and 01/01/2100 and
 * chose 4 different location (roughly Paris, London, Tokyo and New York)
 * We ran the original SunCalc function with these input and created
 * ./testcases.ts to keep track of the results
 *
 * This test suite makes sure the version of SunCalc in this repo returns the
 * same values
 */

const convertTimesObject = (o: Record<string, string | null>) => {
    const r: { [key: string]: Date } = {};
    for (const key of Object.keys(o)) {
        if (o[key]) {
            r[key] = new Date(o[key]);
        } else {
            r[key] = new Date('Invalid');
        }
    }

    return r;
};

describe('SunCalc - migration tests', () => {
    it('returns same results as the original package for randomly choosen test cases', () => {
        for (const testcase of migration_testcases) {
            const { input, output } = testcase;
            const testCaseName = `${input.date} - ${input.lat};${input.lon};${input.elv}`;
            const date = new Date(input.date.valueOf());
            assert.deepEqual(
                SunCalc.getPosition(date, input.lat, input.lon),
                output.getPosition,
                `getPosition - ${testCaseName}`
            );
            assert.deepEqual(
                SunCalc.getTimes(date, input.lat, input.lon, input.elv),
                convertTimesObject(output.getTimes),
                `getTimes - ${testCaseName}`
            );
            assert.deepEqual(
                SunCalc.getMoonPosition(date, input.lat, input.lon),
                output.getMoonPosition,
                `getMoonPosition - ${testCaseName}`
            );
            assert.deepEqual(
                SunCalc.getMoonIllumination(date),
                output.getMoonIllumination,
                `getMoonIllumination - ${testCaseName}`
            );
            assert.deepEqual(
                SunCalc.getMoonTimes(date, input.lat, input.lon, true),
                convertTimesObject(output.getMoonTimesUTC),
                `getMoonTimes (UTC) - ${testCaseName}`
            );
            /*
             * // Don't test the getMoonTimes without UTC because I need to figure
             * // out how to properly handle the timezone.
             * // Currently my local setup is Europe/Paris so the expected dates are
             * // in this TZ but the CI is UTC and it fails all of these test cases
             * // TODO: Figure out how to properly hanlde timezone for these test cases
             * assert.deepEqual(
             *     SunCalc.getMoonTimes(date, input.lat, input.lon, false),
             *     convertTimesObject(output.getMoonTimesNonUTC),
             *     `getMoonTimes (No UTC) - ${testCaseName}`
             * );
             */
        }
    });
});
