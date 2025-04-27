import { DateTime } from 'luxon';
import { getTimes } from '../../../../packages/suncalc/index.js';

const paris = {
    latitude: 48.8575,
    longitude: 2.3514,
    elevation: 35
};

export const getSolarState = (date: Date) => {
    const times = getTimes(date, paris.latitude, paris.longitude, paris.elevation);

    const sunrise = DateTime.fromJSDate(times.sunrise);
    const sunset = DateTime.fromJSDate(times.sunset);
    const dayLength = sunset.diff(sunrise);
    const dayLengthMs = dayLength.milliseconds;

    const yesterday = new Date(date.getTime() - 24 * 3600 * 1000);
    const yesterdayTimes = getTimes(yesterday, paris.latitude, paris.longitude, paris.elevation);

    const yesterdaySunrise = DateTime.fromJSDate(yesterdayTimes.sunrise);
    const yesterdaySunset = DateTime.fromJSDate(yesterdayTimes.sunset);
    const yesterdayDayLength = yesterdaySunset.diff(yesterdaySunrise);

    const dayLengthDiff = dayLength.minus(yesterdayDayLength);
    const dayLengthDiffMs = dayLengthDiff.milliseconds;

    // SunCalc returns JS date without a zone (UTC)
    // We use DateTime to convert these dates to an epoch timestamp
    // On the client side when doing DateTime.fromMillis() DateTime will use the
    // local timezone and convert them appropriately
    // Also sending timestamp on the network is easier than another date format
    return {
        sunrise: sunrise.toMillis(),
        sunset: sunset.toMillis(),
        solarNoon: DateTime.fromJSDate(times.solarNoon).toMillis(),
        goldenHour: DateTime.fromJSDate(times.goldenHour).toMillis(),
        dayLengthMs,
        dayLengthDiffMs
    };
};
