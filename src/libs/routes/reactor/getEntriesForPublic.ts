import { GetRoute } from '../types';
import { getEntriesForPublic } from '../../modules/reactor';

const handler = async () => {
    return getEntriesForPublic();
};

export const route: GetRoute = {
    method: 'get',
    path: '/reactor/getEntriesForPublic',
    handler,
    authentication: 'none'
};
