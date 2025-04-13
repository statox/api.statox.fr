import { DateTime } from 'luxon';
import { getLunarState, getUpcomingLunarStates } from './moon.js';
import { getSolarState } from './sun.js';

export const getTodayEphemerides = () => {
    // Using Luxon to easily mock the date in tests
    const now = DateTime.now().toJSDate();
    const moonState = getLunarState(now);
    const sunState = getSolarState(now);
    const upcomingLunarStates = getUpcomingLunarStates(now);

    return {
        moonState,
        sunState,
        upcomingLunarStates
    };
};
