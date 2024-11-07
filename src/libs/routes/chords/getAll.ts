import { getAllChords } from '../../modules/chords';
import { GetRoute } from '../types';

const handler = async () => {
    return getAllChords();
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getAll',
    handler,
    authentication: 'none'
};
