import { GetRoute } from '../types';
import { getAllEntries } from '../../modules/readingList';

const handler = async () => {
    const items = await getAllEntries();
    return { items };
};

export const route: GetRoute = {
    method: 'get',
    path: '/readingList/getAllEntries',
    handler,
    authentication: 'user'
};
