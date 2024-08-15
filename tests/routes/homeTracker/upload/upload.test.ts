import request from 'supertest';
import { app } from '../../../../src/app';
import { slogCheckLog } from '../../../helpers/slog';

describe('homeTracker/upload', () => {
    it('should log the sent value', async () => {
        await request(app)
            .post('/homeTracker/upload')
            .set('Accept', 'application/json')
            .send({
                sensorName: 'foo',

                batteryCharge: 4.0,
                batteryPercent: 100,
                detectedForcedReset: false,
                detectedInternalSensorFailure: false,
                detectedLowBattery: true,
                detectedSensorFailure: false,
                humidity: 50,
                internalHumidity: 60.9,
                internalTempCelsius: 12.3,
                pressurePa: 100000.0,
                tempCelsius: 23.5,
                timeToSendMs: 7000
            })
            .expect(200);

        slogCheckLog('home-tracker', 'Home tracking event', {
            sensorName: 'foo',

            batteryCharge: 4.0,
            batteryPercent: 100,
            detectedForcedReset: false,
            detectedInternalSensorFailure: false,
            detectedLowBattery: true,
            detectedSensorFailure: false,
            humidity: 50,
            internalHumidity: 60.9,
            internalTempCelsius: 12.3,
            pressurehPa: 1000,
            tempCelsius: 23.5,
            timeToSendMs: 7000
        });
    });

    it('should add log for incorrect value but still log what is correct', async () => {
        await request(app)
            .post('/homeTracker/upload')
            .set('Accept', 'application/json')
            .send({
                sensorName: 'foo',
                tempCelsius: 23.5,
                humidity: 200,
                batteryPercent: 100,
                batteryCharge: 4.0
            })
            .expect(200);

        slogCheckLog('home-tracker', 'Home tracking event', {
            sensorName: 'foo',
            tempCelsius: 23.5,
            batteryPercent: 100,
            batteryCharge: 4.0
        });
        slogCheckLog('home-tracker', 'data error', {
            sensorName: 'foo',
            invalidField: 'humidity',
            invalidValueStr: '200'
        });
    });
});
