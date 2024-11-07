import type { Request } from 'express';
import { PostRoute } from '../types';
import { getHistogramData } from '../../modules/homeTracker';

const handler = async (req: Request) => {
    return getHistogramData(req.body.timeWindow);
};

export const route: PostRoute = {
    method: 'post',
    path: '/homeTracker/histogramData',
    inputSchema: {
        type: 'object',
        required: ['timeWindow'],
        additionalProperties: false,
        properties: {
            timeWindow: {
                type: 'string',
                enum: ['30m', '3h', '12h', '1d', '3d', '7d', '2w', '1M', '2M', '6M', 'alltime']
            }
        }
    },
    handler,
    authentication: 'user'
};
