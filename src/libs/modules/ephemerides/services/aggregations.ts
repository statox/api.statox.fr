import { DateTime } from 'luxon';
import { getLunarState } from './moon';
import { getSolarState } from './sun';

export const getTodayEphemerides = () => {
    // Using Luxon to easily mock the date in tests
    const now = DateTime.now().toJSDate();
    const moon = getLunarState(now);
    const sun = getSolarState(now);

    return {
        ...moon,
        ...sun
    };
};
