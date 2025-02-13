import { DateTime } from 'luxon';
import { getSolarState } from './src/libs/modules/ephemerides/services/sun.js';

const main = async () => {
    const now = DateTime.now();
    for (let daysOffset = 0; daysOffset < 365 * 3; daysOffset++) {
        const then = now.plus({ day: daysOffset });
        const { sunrise: sunriseMs, sunset: sunsetMs } = getSolarState(then.toJSDate());
        const sunrise = DateTime.fromMillis(sunriseMs);
        const sunset = DateTime.fromMillis(sunsetMs);

        const sunriseMinutes = sunrise.get('hour') * 60 + sunrise.get('minute');
        const sunsetMinutes = sunset.get('hour') * 60 + sunset.get('minute');

        let day = '';
        for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
            if (minutes < sunriseMinutes) {
                day += '-';
            } else if (minutes < sunsetMinutes) {
                day += '*';
            } else {
                day += '-';
            }
        }
        // const day = '-'.repeat(24 * 4);

        console.log(
            then.toFormat('dd LL yyyy'),
            sunrise.toFormat('HH:mm'),
            sunset.toFormat('HH:mm'),
            day
        );
    }
};
main();
