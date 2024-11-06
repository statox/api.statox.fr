import { Hemisphere, LunarPhase, Moon, MoonOptions } from 'lunarphase-js';
import { DateTime } from 'luxon';

enum LunarPhaseFrench {
    NEW = 'Nouvelle lune',
    WAXING_CRESCENT = 'Premier croissant',
    FIRST_QUARTER = 'Premier quartier',
    WAXING_GIBBOUS = 'Gibeuse croissante',
    FULL = 'Pleine lune',
    WANING_GIBBOUS = 'Gibeuse décroissante',
    LAST_QUARTER = 'Last Quarter',
    WANING_CRESCENT = 'Dernier croissant'
}

const lunarPhaseToFrench = (phase: LunarPhase): LunarPhaseFrench => {
    if (phase === LunarPhase.NEW) {
        return LunarPhaseFrench.NEW;
    }
    if (phase === LunarPhase.WAXING_CRESCENT) {
        return LunarPhaseFrench.WAXING_CRESCENT;
    }
    if (phase === LunarPhase.FIRST_QUARTER) {
        return LunarPhaseFrench.FIRST_QUARTER;
    }
    if (phase === LunarPhase.WAXING_GIBBOUS) {
        return LunarPhaseFrench.WAXING_GIBBOUS;
    }
    if (phase === LunarPhase.FULL) {
        return LunarPhaseFrench.FULL;
    }
    if (phase === LunarPhase.WANING_GIBBOUS) {
        return LunarPhaseFrench.WANING_GIBBOUS;
    }
    if (phase === LunarPhase.LAST_QUARTER) {
        return LunarPhaseFrench.LAST_QUARTER;
    }
    if (phase === LunarPhase.WANING_CRESCENT) {
        return LunarPhaseFrench.WANING_CRESCENT;
    }

    throw new Error('UNKOWN_LUNAR_PHASE');
};

// From https://en.wikipedia.org/wiki/Lunar_phase#Principal_and_intermediate_phases_of_the_Moon
const visibilityTimes: Map<LunarPhase, string[]> = new Map();
visibilityTimes.set(LunarPhase.NEW, ['06:00', '18:00']);
visibilityTimes.set(LunarPhase.WAXING_CRESCENT, ['09:00', '21:00']);
visibilityTimes.set(LunarPhase.FIRST_QUARTER, ['12:00', '00:00']);
visibilityTimes.set(LunarPhase.WAXING_GIBBOUS, ['15:00', '03:00']);
visibilityTimes.set(LunarPhase.FULL, ['18:00', '06:00']);
visibilityTimes.set(LunarPhase.WANING_GIBBOUS, ['21:00', '09:00']);
visibilityTimes.set(LunarPhase.LAST_QUARTER, ['00:00', '12:00']);
visibilityTimes.set(LunarPhase.WANING_CRESCENT, ['03:00', '15:00']);

export const getCurrentLunarState = async () => {
    // Using Luxon to easily mock the date in tests
    const now = DateTime.now().toJSDate();
    const options: MoonOptions = {
        hemisphere: Hemisphere.NORTHERN
    };
    const phase = Moon.lunarPhase(now, options);
    const phaseFr = lunarPhaseToFrench(phase);
    const lunarAge = Moon.lunarAge(now);
    const lunarAgePercent = Moon.lunarAgePercent(now);
    const visibility = visibilityTimes.get(phase);

    return {
        lunarAge,
        lunarAgePercent,
        phase,
        phaseFr,
        visibilityWindow: visibility
    };
};
