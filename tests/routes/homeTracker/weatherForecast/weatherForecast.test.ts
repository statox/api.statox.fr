import { assert } from 'chai';
import request from 'supertest';
import { app } from '../../../../src/app.js';
import { DateTime, DurationLike } from 'luxon';
import { th } from '../../../helpers/index.js';

type PressureHistoryFixture = { pressurehPa: number; tsDiff: DurationLike };

const pressureHistoryFixtureToELKFixture = (pressureHistory: PressureHistoryFixture[]) =>
    pressureHistory.map(({ pressurehPa, tsDiff }) => {
        return {
            '@timestamp': DateTime.now().minus(tsDiff).toMillis(),
            document: {
                sensorName: 'salon',
                pressurehPa
            }
        };
    });

describe('homeTracker/weatherForecast', () => {
    beforeEach('Flush ELK', th.elk.flush);

    it.skip('Should get pressure history properly', async () => {
        const pressureHistory: PressureHistoryFixture[] = [];
        const hourlyFrequency = 60 / 10; // One record every 10 minutes
        const nbRecords = hourlyFrequency * 25; // 25 hours of recording (one additional hours to avoid flakyness)
        const lastRecordOffsetMinutes = 2; // Last record happened 2 minutes ago

        for (let record = 0; record < nbRecords; record++) {
            const offsetminutes = lastRecordOffsetMinutes + record * 10;
            const offsetPressure = Math.floor(record / hourlyFrequency); // Increase pressure by 1 every hour

            pressureHistory.push({
                pressurehPa: 1000 + offsetPressure,
                tsDiff: { minutes: offsetminutes }
            });
        }

        const logs = pressureHistoryFixtureToELKFixture(pressureHistory);
        await th.elk.fixture({
            'data-home-tracker': logs
        });

        await request(app)
            .get('/homeTracker/getWeatherForecast')
            .expect(200)
            .then((response) => {
                const { forecast, pressureHistory } = response.body;

                assert.lengthOf(pressureHistory, 9);
                assert.deepEqual(
                    pressureHistory.map(
                        (v: { timestamp: number; averagePressurehPa: number }) =>
                            v.averagePressurehPa
                    ),
                    [1022, 1020, 1017, 1014, 1011, 1008, 1005, 1002, 1000]
                );

                assert.equal(forecast.pressureTrend, 'falling');
                assert.equal(forecast.forecast, 'Rain at Times, Worse Later');
            });
    });

    describe('Should predict weather', () => {
        it('steady 1005hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1006.179, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 1005.853, tsDiff: { minutes: 5 } }
            ];
            const logs = pressureHistoryFixtureToELKFixture(pressureHistory);
            await th.elk.fixture({
                'data-home-tracker': logs
            });

            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'steady',
                        forecast: 'Fairly Fine, Showers Likely',
                        dataPoints: {
                            oldest: {
                                timestampMs: logs[0]['@timestamp'],
                                pressurehPa: 1006.179
                            },
                            latest: {
                                timestampMs: logs[1]['@timestamp'],
                                pressurehPa: 1005.853
                            }
                        }
                    });
                });
        });
        it('steady 1015hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1016, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 1015, tsDiff: { minutes: 5 } }
            ];
            const logs = pressureHistoryFixtureToELKFixture(pressureHistory);
            await th.elk.fixture({
                'data-home-tracker': logs
            });

            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'steady',
                        forecast: 'Fine, Possibly Showers',
                        dataPoints: {
                            oldest: {
                                timestampMs: logs[0]['@timestamp'],
                                pressurehPa: 1016
                            },
                            latest: {
                                timestampMs: logs[1]['@timestamp'],
                                pressurehPa: 1015
                            }
                        }
                    });
                });
        });
        it('steady 1020hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1019, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 1020, tsDiff: { minutes: 5 } }
            ];
            const logs = pressureHistoryFixtureToELKFixture(pressureHistory);
            await th.elk.fixture({
                'data-home-tracker': logs
            });

            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'steady',
                        forecast: 'Fine Weather',
                        dataPoints: {
                            oldest: {
                                timestampMs: logs[0]['@timestamp'],
                                pressurehPa: 1019
                            },
                            latest: {
                                timestampMs: logs[1]['@timestamp'],
                                pressurehPa: 1020
                            }
                        }
                    });
                });
        });
        it('rising 1005hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1002, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 1005, tsDiff: { minutes: 5 } }
            ];
            const logs = pressureHistoryFixtureToELKFixture(pressureHistory);
            await th.elk.fixture({
                'data-home-tracker': logs
            });

            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'rising',
                        forecast: 'Fairly Fine, Possibly Showers Early',
                        dataPoints: {
                            oldest: {
                                timestampMs: logs[0]['@timestamp'],
                                pressurehPa: 1002
                            },
                            latest: {
                                timestampMs: logs[1]['@timestamp'],
                                pressurehPa: 1005
                            }
                        }
                    });
                });
        });
        it('falling 995hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1000, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 995, tsDiff: { minutes: 5 } }
            ];
            const logs = pressureHistoryFixtureToELKFixture(pressureHistory);
            await th.elk.fixture({
                'data-home-tracker': logs
            });

            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'falling',
                        forecast: 'Rain at Times, Worse Later',
                        dataPoints: {
                            oldest: {
                                timestampMs: logs[0]['@timestamp'],
                                pressurehPa: 1000
                            },
                            latest: {
                                timestampMs: logs[1]['@timestamp'],
                                pressurehPa: 995
                            }
                        }
                    });
                });
        });

        it('rising with fluctuation 1020hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1018, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 1018.5, tsDiff: { hours: 2, minutes: 45 } },
                { pressurehPa: 1019, tsDiff: { hours: 2, minutes: 35 } },
                { pressurehPa: 1019.5, tsDiff: { hours: 2, minutes: 25 } },
                { pressurehPa: 1020, tsDiff: { hours: 2, minutes: 15 } },
                { pressurehPa: 1020.5, tsDiff: { hours: 2, minutes: 5 } },
                { pressurehPa: 1022, tsDiff: { hours: 1, minutes: 55 } },
                { pressurehPa: 1020.5, tsDiff: { hours: 1, minutes: 45 } },
                { pressurehPa: 1019, tsDiff: { hours: 1, minutes: 35 } },
                { pressurehPa: 1017.5, tsDiff: { hours: 1, minutes: 25 } },
                { pressurehPa: 1016, tsDiff: { hours: 1, minutes: 15 } },
                { pressurehPa: 1015, tsDiff: { hours: 1, minutes: 5 } },
                { pressurehPa: 1016, tsDiff: { minutes: 55 } },
                { pressurehPa: 1016, tsDiff: { minutes: 45 } },
                { pressurehPa: 1017, tsDiff: { minutes: 35 } },
                { pressurehPa: 1018, tsDiff: { minutes: 25 } },
                { pressurehPa: 1019, tsDiff: { minutes: 15 } },
                { pressurehPa: 1020, tsDiff: { minutes: 5 } }
            ];
            const logs = pressureHistoryFixtureToELKFixture(pressureHistory);
            await th.elk.fixture({
                'data-home-tracker': logs
            });

            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'rising',
                        forecast: 'Fine Weather',
                        dataPoints: {
                            oldest: {
                                timestampMs: logs[0]['@timestamp'],
                                pressurehPa: 1018
                            },
                            latest: {
                                timestampMs: logs[logs.length - 1]['@timestamp'],
                                pressurehPa: 1020
                            }
                        }
                    });
                });
        });
    });

    describe('Should detect invalid data', () => {
        it('Only one log in the last 3 hours', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 800, tsDiff: { hours: 3, minutes: 30 } },
                { pressurehPa: 1005, tsDiff: { minutes: 5 } }
            ];

            await th.elk.fixture({
                'data-home-tracker': pressureHistoryFixtureToELKFixture(pressureHistory)
            });
            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'unknown',
                        forecast: 'ERROR - couldnt determine forecast'
                    });
                });

            th.slog.checkLog(
                'weather-forecast',
                'zambrettiForecaster - Got an error while computing forecast',
                {
                    error: {
                        message: 'NOT_ENOUGH_DATA'
                    }
                }
            );
        });
        it('Only logs more than 3 hours', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 650, tsDiff: { hours: 3, minutes: 50 } },
                { pressurehPa: 750, tsDiff: { hours: 3, minutes: 40 } },
                { pressurehPa: 850, tsDiff: { hours: 3, minutes: 30 } }
            ];

            await th.elk.fixture({
                'data-home-tracker': pressureHistoryFixtureToELKFixture(pressureHistory)
            });
            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'unknown',
                        forecast: 'ERROR - couldnt determine forecast'
                    });
                });

            th.slog.checkLog(
                'weather-forecast',
                'zambrettiForecaster - Got an error while computing forecast',
                {
                    error: {
                        message: 'MISSING_HISTORIC_DATA'
                    }
                }
            );
        });
        it('No recent logs less than 20 minutes ago', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 800, tsDiff: { hours: 2, minutes: 50 } },
                { pressurehPa: 1005, tsDiff: { minutes: 25 } }
            ];

            await th.elk.fixture({
                'data-home-tracker': pressureHistoryFixtureToELKFixture(pressureHistory)
            });
            await request(app)
                .get('/homeTracker/getWeatherForecast')
                .expect(200)
                .then((response) => {
                    const { forecast } = response.body;

                    assert.deepEqual(forecast, {
                        pressureTrend: 'unknown',
                        forecast: 'ERROR - couldnt determine forecast'
                    });
                });

            th.slog.checkLog(
                'weather-forecast',
                'zambrettiForecaster - Got an error while computing forecast',
                {
                    error: {
                        message: 'MISSING_RECENT_DATA'
                    }
                }
            );
        });
    });
});
