import { DateTime } from 'luxon';
import { getTimes } from '../../../../packages/suncalc';

const paris = {
    latitude: 48.8575,
    longitude: 2.3514,
    elevation: 35
};

export const getSolarState = (date: Date) => {
    const times = getTimes(date, paris.latitude, paris.longitude, paris.elevation);

    const { sunrise, sunset, solarNoon, goldenHour } = times;

    // SunCalc returns JS date without a zone (UTC)
    // We use DateTime to convert these dates to an epoch timestamp
    // On the client side when doing DateTime.fromMillis() DateTime will use the
    // local timezone and convert them appropriately
    // Also sending timestamp on the network is easier than another date format
    return {
        sunrise: DateTime.fromJSDate(sunrise).toMillis(),
        sunset: DateTime.fromJSDate(sunset).toMillis(),
        solarNoon: DateTime.fromJSDate(solarNoon).toMillis(),
        goldenHour: DateTime.fromJSDate(goldenHour).toMillis()
    };
};
