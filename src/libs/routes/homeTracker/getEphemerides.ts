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
    authentication: 'none'
};
