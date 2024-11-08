import { getAllChords } from '../../modules/chords';
import { GetRoute } from '../types';

const handler = async () => {
    return getAllChords();
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getAll',
    handler,
    authentication: 'none',
    outputSchema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                artist: {
                    type: 'string'
                },
                title: {
                    type: 'string'
                },
                url: {
                    type: 'string'
                },
                creationDate: {
                    type: 'number'
                },
                tags: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                pouet: {
                    type: 'number'
                }
            },
            required: ['pouet', 'artist', 'title', 'url', 'creationDate', 'tags']
        }
    }
};
