import request from 'supertest';
import { app } from '../../../../src/app';
import { ingestSensorData } from '../../../../src/libs/modules/homeTracker';
import { assert } from 'chai';
import { th } from '../../../helpers';

describe('homeTracker/getLatest', () => {
    // TODO find a way to ingest data a different time (i.e. create an ELK fixture) and
    // add tests on the creation of the time buckets
    it('should return correct data', async () => {
        const jardiniere1 = {
            sensorName: 'jardiniere',
            batteryCharge: 4,
            batteryPercent: 100,
            humidity: 30,
            tempCelsius: 22
        };
        const jardiniere2 = {
            sensorName: 'jardiniere',
            batteryCharge: 4,
            batteryPercent: 100,
            humidity: 30,
            tempCelsius: 22
        };
        const salon1 = {
            sensorName: 'salon',
            batteryCharge: 4,
            batteryPercent: 100,
            humidity: 30,
            internalHumidity: 40,
            tempCelsius: 21,
            internalTempCelsius: 25,
            pressurePa: 101400
        };
        const salon2 = {
            sensorName: 'salon',
            batteryCharge: 4,
            batteryPercent: 100,
            humidity: 30,
            internalHumidity: 40,
            tempCelsius: 22,
            internalTempCelsius: 25,
            pressurePa: 101600
        };
        await ingestSensorData(jardiniere1);
        await ingestSensorData(salon1);
        await ingestSensorData(salon2);
        await ingestSensorData(jardiniere2);

        await request(app)
            .post('/homeTracker/getLatest')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer fakeaccesskeyfortests')
            .send({ timeWindow: '3h' })
            .expect(200)
            .then((response) => {
                const { histogramData, sensorNames } = response.body;

                assert.sameMembers(sensorNames, ['salon', 'jardiniere']);

                assert.lengthOf(Object.keys(histogramData), 1);

                const ts = Object.keys(histogramData)[0];
                th.time.isAroundNowSec(Number(ts));

                assert.deepEqual(histogramData[ts], {
                    tempCelsius: {
                        jardiniere: 22,
                        salon: 21.5
                    },
                    internalTempCelsius: {
                        salon: 25
                    },
                    batteryCharge: {
                        jardiniere: 4,
                        salon: 4
                    },
                    humidity: {
                        jardiniere: 30,
                        salon: 30
                    },
                    internalHumidity: {
                        salon: 40
                    },
                    pressurehPa: {
                        salon: 1015
                    }
                });
            });
    });
});
