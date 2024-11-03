import type { Request, Response } from 'express';
import { PostRoute } from '../types';
import { getHistogramData } from '../../modules/homeTracker';

const handler = async (req: Request, res: Response) => {
    const data = await getHistogramData(req.body.timeWindow);
    res.send(data);
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
