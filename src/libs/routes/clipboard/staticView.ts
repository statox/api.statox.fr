import { GetRoute } from '../types';
import { getEntriesForStaticView } from '../../modules/clipboard';

const handler = async () => {
    return getEntriesForStaticView();
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/view',
    handler,
    authentication: 'none'
};
