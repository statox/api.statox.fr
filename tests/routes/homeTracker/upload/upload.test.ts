import request from 'supertest';
import { app } from '../../../../src/app';
import { slogCheckLog } from '../../../helpers/slog';

describe('homeTracker/upload', () => {
    it('Should log the sent value', async () => {
        await request(app)
            .post('/homeTracker/upload')
            .set('Accept', 'application/json')
            .send({
                sensorName: 'foo',
                tempCelsius: 23.5,
                humidity: 50,
                pressurePa: 100000.0,
                internalTempCelsius: 12.3,
                internalHumidity: 60.9,
                batteryPercent: 100,
                batteryCharge: 4.0
            })
            .expect(200);

        slogCheckLog('home-tracker', 'Home tracking event', {
            sensorName: 'foo',
            tempCelsius: 23.5,
            humidity: 50,
            pressurehPa: 1000,
            internalTempCelsius: 12.3,
            internalHumidity: 60.9,
            batteryPercent: 100,
            batteryCharge: 4.0
        });
    });
});
