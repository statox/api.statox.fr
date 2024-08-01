import sinon from 'sinon';
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
                tempCelsius: 23.5,
                humidity: 50,
                pressurePa: 100000.0,
                internalTempCelsius: 12.3,
                internalHumidity: 60.9,
                batteryPercent: 100,
                batteryCharge: 4.0,
                timeToSendMs: 7000,
                detectedLowBattery: true,
                detectedForcedReset: false
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
            batteryCharge: 4.0,
            timeToSendMs: 7000,
            detectedLowBattery: true,
            detectedForcedReset: false
        });
    });

    it('should reject incoherent values', async () => {
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
            .expect(400);

        slogCheckLog('app', 'Caught error', {
            error: sinon.match((error) => {
                const bodyError = error?.validationErrors?.body[0];
                const isCorrectArg = bodyError?.instancePath === '/humidity';
                const isCorrectMessage = bodyError?.message === 'must be <= 100';

                return isCorrectArg && isCorrectMessage;
            })
        });
    });
});
