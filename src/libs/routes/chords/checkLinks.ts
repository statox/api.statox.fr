import { checkChordsUrl } from '../../modules/chords';
import { GetRoute } from '../types';

const handler = async () => {
    return checkChordsUrl();
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/checkLinks',
    handler,
    authentication: 'none'
};
