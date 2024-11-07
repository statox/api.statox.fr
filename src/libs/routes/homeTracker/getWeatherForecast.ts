import { GetRoute } from '../types';
import { zambrettiForecaster } from '../../modules/homeTracker';
import { get24hoursOfPressure } from '../../modules/homeTracker/services/getPressureHistory';

const handler = async () => {
    const [forecast, pressureHistory] = await Promise.all([
        zambrettiForecaster(),
        get24hoursOfPressure()
    ]);
    return { forecast, pressureHistory };
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/getWeatherForecast',
    handler,
    authentication: 'none'
};
