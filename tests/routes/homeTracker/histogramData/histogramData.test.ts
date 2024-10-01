import request from 'supertest';
import { app } from '../../../../src/app';
import { assert } from 'chai';
import { th } from '../../../helpers';
import { DateTime } from 'luxon';

describe('homeTracker/histogramData', () => {
    beforeEach('Flush ELK', th.elk.flush);

    it('should average the data in the same bucket', async () => {
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
            .post('/homeTracker/histogramData')
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

    it('should create buckets based on the time', async () => {
        await th.elk.fixture({
            // Create logs every 5 minutes for the past 4 hours
            'data-home-tracker': new Array(4 * 6 * 2)
                .fill(0)
                .map((_, i) =>
                    DateTime.now()
                        .minus({ minutes: 5 * i })
                        .toMillis()
                )
                .map((ts) => {
                    return {
                        '@timestamp': ts,
                        document: {
                            sensorName: 'salon',
                            batteryCharge: 2,
                            humidity: 30,
                            tempCelsius: 20
                        }
                    };
                })
        });

        await request(app)
            .post('/homeTracker/histogramData')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer fakeaccesskeyfortests')
            .send({ timeWindow: '3h' })
            .expect(200)
            .then((response) => {
                const { histogramData } = response.body;

                assert.lengthOf(Object.keys(histogramData), 18);

                // Check that the date of the earliest bucket is roughly 3 hours in the past
                // even if existing data earlier than that
                const minTS = Math.min(...Object.keys(histogramData).map(Number));
                const minDate = DateTime.fromSeconds(minTS);
                const diff = DateTime.now().diff(minDate, 'minutes').minutes;
                assert.isAtMost(diff, 3 * 60 + 30);
                assert.isAtLeast(diff, 3 * 60 - 30);
            });
    });
});
