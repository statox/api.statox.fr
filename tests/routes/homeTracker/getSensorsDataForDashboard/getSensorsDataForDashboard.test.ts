import request from 'supertest';
import { app } from '../../../../src/app.js';
import { assert } from 'chai';
import { th } from '../../../helpers/index.js';
import { DateTime } from 'luxon';

describe('homeTracker/getSensorsDataForDashboard', () => {
    it('Should return one entry by sensor with the last log', async () => {
        const nowMillis = DateTime.now().toMillis();
        const nowSec = Math.floor(nowMillis / 1000);
        const tenMinutesAgoMillis = DateTime.now().minus({ minutes: 10 }).toMillis();
        const tenMinutesAgoSec = Math.floor(tenMinutesAgoMillis / 1000);
        const twentyMinutesAgoMillis = DateTime.now().minus({ minutes: 20 }).toMillis();

        await th.mysql.fixture({
            HomeTrackerSensor: [{
                name: 'salon',
                hexColor: "#FF0000",
                lastSyncDateUnix: nowSec
            },{
                name: 'jardiniere',
                hexColor: "#00FF00",
                lastSyncDateUnix: tenMinutesAgoSec
            }]
        })

        await th.elk.flush();
        await th.elk.fixture({
            'data-home-tracker': [
                {
                    // Make sure we don't return sensors which are not in the HomeTrackerSensor table
                    '@timestamp': tenMinutesAgoMillis,
                    document: {
                        sensorName: 'not-in-db',
                        batteryCharge: 0,
                        humidity: 0,
                        tempCelsius: 0
                    }
                },
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

        const response = await request(app)
        .get('/homeTracker/getSensorsDataForDashboard')
        .expect(200)

        const { sensors } = response.body;

        assert.sameDeepMembers(sensors, [
            {
                sensorName: 'jardiniere',
                hexColor: "#00FF00",
                lastSyncDateUnix: tenMinutesAgoSec,
                lastLogData: {
                    sensorName: 'jardiniere',
                    batteryCharge: 4,
                    humidity: 30,
                    tempCelsius: 21
                }
            },
            {
                sensorName: 'salon',
                hexColor: "#FF0000",
                lastSyncDateUnix: nowSec,
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
