import { GetRoute } from '../types';
import { getTodayEphemerides } from '../../modules/ephemerides';

const handler = async () => {
    const ephemerides = getTodayEphemerides();
    return { ephemerides };
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/getEphemerides',
    handler,
    authentication: 'none',
    outputSchema: {
        type: 'object',
        properties: {
            ephemerides: {
                type: 'object',
                properties: {
                    sunrise: { type: 'number' },
                    sunset: { type: 'number' },
                    solarNoon: { type: 'number' },
                    goldenHour: { type: 'number' },
                    lunarAge: { type: 'number' },
                    lunarAgePercent: { type: 'number' },
                    moonPhase: { type: 'string' },
                    moonPhaseFr: { type: 'string' },
                    moonVisibilityWindow: {
                        type: 'array',
                        items: { type: 'string' },
                        maxItems: 2,
                        minItems: 2
                    }
                },
                required: [
                    'sunrise',
                    'sunset',
                    'solarNoon',
                    'goldenHour',
                    'lunarAge',
                    'lunarAgePercent',
                    'moonPhase',
                    'moonPhaseFr',
                    'moonVisibilityWindow'
                ],
                additionalProperties: false
            }
        },
        required: ['ephemerides'],
        additionalProperties: false
    }
};
