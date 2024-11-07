import { GetRoute } from '../types';
import { getWatchedContent } from '../../modules/webWatcher';

const handler = async () => {
    return getWatchedContent();
};

export const route: GetRoute = {
    method: 'get',
    path: '/webWatcher/getAllWatchers',
    handler,
    authentication: 'none'
};
