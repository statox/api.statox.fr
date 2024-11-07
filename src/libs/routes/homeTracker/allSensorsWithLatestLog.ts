import { GetRoute } from '../types';
import { getAllSensorsWithLatestLog } from '../../modules/homeTracker';

const handler = async () => {
    return getAllSensorsWithLatestLog();
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/allSensorsWithLatestLog',
    handler,
    authentication: 'none'
};
