import { Hemisphere, LunarPhase, Moon, MoonOptions } from 'lunarphase-js';
import { LunarPhaseDetails } from '../types.js';

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
        frenchName: 'Last Quarter'
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
