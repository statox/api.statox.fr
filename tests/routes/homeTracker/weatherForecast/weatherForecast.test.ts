import { assert } from 'chai';
import request from 'supertest';
import { app } from '../../../../src/app';
import { DateTime, DurationLike } from 'luxon';
import { th } from '../../../helpers';

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
    describe('Should predict weather', () => {
        it('steady 1005hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1006.179, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 1005.853, tsDiff: { minutes: 5 } }
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
                        pressureTrend: 'steady',
                        forecast: 'Fairly Fine, Showers Likely'
                    });
                });
        });
        it('steady 1015hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1015, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 1015, tsDiff: { minutes: 5 } }
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
                        pressureTrend: 'steady',
                        forecast: 'Fine, Possibly Showers'
                    });
                });
        });
        it('steady 1020hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1020, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 1020, tsDiff: { minutes: 5 } }
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
                        pressureTrend: 'steady',
                        forecast: 'Fine Weather'
                    });
                });
        });
        it('rising 1005hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1002, tsDiff: { hours: 2, minutes: 55 } },
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
                        pressureTrend: 'rising',
                        forecast: 'Fairly Fine, Possibly Showers Early'
                    });
                });
        });
        it('falling 995hpa', async () => {
            const pressureHistory: PressureHistoryFixture[] = [
                { pressurehPa: 1000, tsDiff: { hours: 2, minutes: 55 } },
                { pressurehPa: 995, tsDiff: { minutes: 5 } }
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
                        pressureTrend: 'falling',
                        forecast: 'Rain at Times, Worse Later'
                    });
                });
        });
    });
});
