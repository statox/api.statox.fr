import type { Request, Response } from 'express';
import { GetRoute } from '../types';
import { zambrettiForecaster } from '../../modules/homeTracker';

const handler = async (_req: Request, res: Response) => {
    const forecast = await zambrettiForecaster();
    res.send({ forecast });
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/getWeatherForecast',
    handler,
    authentication: 'none'
};
