import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';

describe('homeTracker/upload', () => {
    it('should log the sent value to home tracker index and add sensor name in access log', async () => {
        const res = await request(app)
            .post('/homeTracker/upload')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer fakeaccesskeyfortests')
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

        assert.deepEqual(res.body, { instructSleepSec: 596 });

        th.elk.checkDocumentCreated('data-home-tracker', {
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

        th.slog.checkLog('app', 'access-log', {
            path: '/homeTracker/upload',
            code: 200,
            remoteIp: '::ffff:127.0.0.1',
            requestId: '00000000-0000-0000-0000-000000000001',
            requestInterrupted: false,
            context: {
                sensorName: 'foo'
            }
        });
    });

    it('should add log for incorrect value but still log what is correct', async () => {
        const res = await request(app)
            .post('/homeTracker/upload')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer fakeaccesskeyfortests')
            .send({
                sensorName: 'foo',
                tempCelsius: 23.5,
                humidity: 200,
                batteryPercent: 100,
                batteryCharge: 4.0
            })
            .expect(200);

        assert.deepEqual(res.body, { instructSleepSec: 596 });

        th.elk.checkDocumentCreated('data-home-tracker', {
            sensorName: 'foo',
            tempCelsius: 23.5,
            batteryPercent: 100,
            batteryCharge: 4.0
        });
        th.slog.checkLog('home-tracker', 'data error', {
            sensorName: 'foo',
            invalidField: 'humidity',
            invalidValueStr: '200'
        });
    });
});
