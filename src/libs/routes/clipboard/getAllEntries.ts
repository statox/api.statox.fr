import { GetRoute } from '../types';
import { getAllEntries } from '../../modules/clipboard';

const handler = async () => {
    return getAllEntries();
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/getAllEntries',
    handler,
    authentication: 'user'
};
