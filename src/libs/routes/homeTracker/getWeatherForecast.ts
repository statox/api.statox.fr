import type { Request, Response } from 'express';
import { GetRoute } from '../types';
import { zambrettiForecaster } from '../../modules/homeTracker';
import { get24hoursOfPressure } from '../../modules/homeTracker/services/getPressureHistory';

const handler = async (_req: Request, res: Response) => {
    const [forecast, pressureHistory] = await Promise.all([
        zambrettiForecaster(),
        get24hoursOfPressure()
    ]);
    res.send({ forecast, pressureHistory });
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/getWeatherForecast',
    handler,
    authentication: 'none'
};
