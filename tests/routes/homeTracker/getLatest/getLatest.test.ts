import request from 'supertest';
import { app } from '../../../../src/app';
import { assert } from 'chai';
import { th } from '../../../helpers';
import { DateTime } from 'luxon';

describe('homeTracker/getLatest', () => {
    it('should return correct data', async () => {
        await th.elk.fixture({
            'data-home-tracker': [
                {
                    '@timestamp': DateTime.now().toMillis(),
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 4,
                        batteryPercent: 100,
                        humidity: 30,
                        internalHumidity: 40,
                        tempCelsius: 21,
                        internalTempCelsius: 25,
                        pressurehPa: 1014
                    }
                },
                {
                    '@timestamp': DateTime.now().toMillis(),
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 4,
                        batteryPercent: 100,
                        humidity: 30,
                        internalHumidity: 40,
                        tempCelsius: 22,
                        internalTempCelsius: 25,
                        pressurehPa: 1016
                    }
                },
                {
                    '@timestamp': DateTime.now().toMillis(),
                    document: {
                        sensorName: 'jardiniere',
                        batteryCharge: 4,
                        batteryPercent: 100,
                        humidity: 30,
                        tempCelsius: 22
                    }
                },
                {
                    '@timestamp': DateTime.now().toMillis(),
                    document: {
                        sensorName: 'jardiniere',
                        batteryCharge: 4,
                        batteryPercent: 100,
                        humidity: 30,
                        tempCelsius: 22
                    }
                }
            ]
        });

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
