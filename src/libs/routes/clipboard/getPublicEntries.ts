import { GetRoute } from '../types';
import { getPublicEntries } from '../../modules/clipboard';

const handler = async () => {
    return getPublicEntries();
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/getPublicEntries',
    handler,
    authentication: 'none'
};
