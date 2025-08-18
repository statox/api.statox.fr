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
        const oneDayAgoMillis = DateTime.now().minus({ day: 1 }).toMillis();

        await th.mysql.fixture({
            HomeTrackerSensor: [
                {
                    name: 'salon',
                    hexColor: '#FF0000',
                    lastSyncDateUnix: nowSec,
                    lastAlertDateUnix: tenMinutesAgoSec,
                    tempOffset: -1.2,
                    sleepTimeSec: 300
                },
                {
                    name: 'jardiniere',
                    hexColor: '#00FF00',
                    lastSyncDateUnix: tenMinutesAgoSec,
                    tempOffset: 0.2
                }
            ]
        });

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
                    '@timestamp': oneDayAgoMillis,
                    document: {
                        sensorName: 'salon',
                        batteryCharge: 5,
                        humidity: 10,
                        tempCelsius: 10
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
            .expect(200);

        const { sensors } = response.body;

        assert.sameDeepMembers(sensors, [
            {
                sensorName: 'jardiniere',
                hexColor: '#00FF00',
                tempOffset: 0.2,
                sleepTimeSec: 596,
                lastSyncDateUnix: tenMinutesAgoSec,
                lastAlertDateUnix: null,
                lastLogData: {
                    timestamp: tenMinutesAgoMillis,
                    sensorName: 'jardiniere',
                    batteryCharge: 4,
                    humidity: 30,
                    tempCelsius: 21
                },
                oneHourAgoLogData: {
                    // We just _try_ to get the log the closest to one hour ago
                    // Given the fixtures here it's the one from 20 minutes ago
                    timestamp: twentyMinutesAgoMillis,
                    sensorName: 'jardiniere',
                    batteryCharge: 4,
                    humidity: 0,
                    tempCelsius: 0
                },
                oneDayAgoLogData: {
                    // We just _try_ to get the log the closest to one day ago
                    // Given the fixtures here it's the one from 20 minutes ago
                    timestamp: twentyMinutesAgoMillis,
                    sensorName: 'jardiniere',
                    batteryCharge: 4,
                    humidity: 0,
                    tempCelsius: 0
                }
            },
            {
                sensorName: 'salon',
                hexColor: '#FF0000',
                tempOffset: -1.2,
                sleepTimeSec: 300,
                lastSyncDateUnix: nowSec,
                lastAlertDateUnix: tenMinutesAgoSec,
                lastLogData: {
                    timestamp: nowMillis,
                    sensorName: 'salon',
                    batteryCharge: 4,
                    humidity: 30,
                    tempCelsius: 21
                },
                oneHourAgoLogData: {
                    // We just _try_ to get the log the closest to one hour ago
                    // Given the fixtures here it's the one from 10 minutes ago
                    timestamp: tenMinutesAgoMillis,
                    sensorName: 'salon',
                    batteryCharge: 4,
                    humidity: 0,
                    tempCelsius: 0
                },
                oneDayAgoLogData: {
                    // We just _try_ to get the log the closest to one day ago
                    // Given the fixtures here we do get the log from 1 day ago
                    timestamp: oneDayAgoMillis,
                    sensorName: 'salon',
                    batteryCharge: 5,
                    humidity: 10,
                    tempCelsius: 10
                }
            }
        ]);
    });
});
