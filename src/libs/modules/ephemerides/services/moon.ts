import { Hemisphere, LunarPhase, Moon, MoonOptions } from 'lunarphase-js';
import { LunarPhaseDetails } from '../types.js';
import { DateTime } from 'luxon';

// Visibility windows coming from
// https://en.wikipedia.org/wiki/Lunar_phase#Principal_and_intermediate_phases_of_the_Moon
const lunarPhasesDetails: {
    [phase in LunarPhase]: LunarPhaseDetails;
} = {
    New: {
        visibilityWindow: ['06:00', '18:00'],
        frenchName: 'Nouvelle lune'
    },
    'Waxing Crescent': {
        visibilityWindow: ['09:00', '21:00'],
        frenchName: 'Premier croissant'
    },
    'First Quarter': {
        visibilityWindow: ['12:00', '00:00'],
        frenchName: 'Premier quartier'
    },
    'Waxing Gibbous': {
        visibilityWindow: ['15:00', '03:00'],
        frenchName: 'Gibeuse croissante'
    },
    Full: {
        visibilityWindow: ['18:00', '06:00'],
        frenchName: 'Pleine lune'
    },
    'Waning Gibbous': {
        visibilityWindow: ['21:00', '09:00'],
        frenchName: 'Gibeuse décroissante'
    },
    'Last Quarter': {
        visibilityWindow: ['00:00', '12:00'],
        frenchName: 'Dernier quartier'
    },
    'Waning Crescent': {
        visibilityWindow: ['03:00', '15:00'],
        frenchName: 'Dernier croissant'
    }
};

export const getLunarState = (date: Date) => {
    const options: MoonOptions = {
        hemisphere: Hemisphere.NORTHERN
    };

    const lunarAge = Moon.lunarAge(date);
    const lunarAgePercent = Moon.lunarAgePercent(date);

    const moonPhase = Moon.lunarPhase(date, options);
    const phaseDetails = lunarPhasesDetails[moonPhase];
    const moonPhaseFr = phaseDetails.frenchName;
    const visibility = phaseDetails.visibilityWindow;

    return {
        lunarAge,
        lunarAgePercent,
        moonPhase,
        moonPhaseFr,
        moonVisibilityWindow: visibility
    };
};

// Return the phases of the moon for the upcoming lunar cycle
// (A cycle is 29.5 days, we compute for 30 days)
export const getUpcomingLunarStates = (date: Date) => {
    const start = DateTime.fromJSDate(date);
    start.set({ hour: 0, minute: 0, second: 0 });

    return Array.from({ length: 30 }).map((_, index) => {
        const day = start.plus({ days: index });
        const lunarState = getLunarState(day.toJSDate());
        return { tsMillis: day.toMillis(), lunarState };
    });
};
