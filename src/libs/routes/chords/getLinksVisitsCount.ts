import { GetRoute } from '../types';
import { getLinksVisitsCount } from '../../modules/chords';

const handler = async () => {
    return getLinksVisitsCount();
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getLinksVisitsCount',
    handler,
    authentication: 'none'
};
