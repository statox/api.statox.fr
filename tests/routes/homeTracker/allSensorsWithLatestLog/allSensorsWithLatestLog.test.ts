import request from 'supertest';
import { app } from '../../../../src/app.js';
import { assert } from 'chai';
import { th } from '../../../helpers/index.js';
import { DateTime } from 'luxon';

describe('homeTracker/allSensorsWithLatestLog', () => {
    it('Should return one entry by sensor with the last log', async () => {
        const nowMillis = DateTime.now().toMillis();
        const tenMinutesAgoMillis = DateTime.now().minus({ minutes: 10 }).toMillis();
        const twentyMinutesAgoMillis = DateTime.now().minus({ minutes: 20 }).toMillis();

        await th.elk.flush();
        await th.elk.fixture({
            'data-home-tracker': [
                {
                    '@timestamp': nowMillis,
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 21
                    }
                },
                {
                    '@timestamp': tenMinutesAgoMillis,
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 4,
                        humidity: 0,
                        tempCelsius: 0
                    }
                },
                {
                    '@timestamp': tenMinutesAgoMillis,
                    document: {
                        sensorName: 'jardiniere',
                        batteryCharge: 4,
                        humidity: 30,
                        tempCelsius: 21
                    }
                },
                {
                    '@timestamp': twentyMinutesAgoMillis,
                    document: {
                        sensorName: 'jardiniere',
                        batteryCharge: 4,
                        humidity: 0,
                        tempCelsius: 0
                    }
                }
            ]
        });

        await request(app)
            .get('/homeTracker/allSensorsWithLatestLog')
            .expect(200)
            .then((response) => {
                const { sensors } = response.body;

                assert.sameDeepMembers(sensors, [
                    {
                        sensorName: 'jardiniere',
                        rgbColor: { r: 0, g: 140, b: 0 },
                        lastLogTimestamp: Math.floor(tenMinutesAgoMillis / 1000),
                        lastLogData: {
                            sensorName: 'jardiniere',
                            batteryCharge: 4,
                            humidity: 30,
                            tempCelsius: 21
                        }
                    },
                    {
                        sensorName: 'salon',
                        rgbColor: { r: 140, g: 0, b: 60 },
                        lastLogTimestamp: Math.floor(nowMillis / 1000),
                        lastLogData: {
                            sensorName: 'salon',
                            batteryCharge: 4,
                            humidity: 30,
                            tempCelsius: 21
                        }
                    }
                ]);
            });
    });
});
