import request from 'supertest';
import { app } from '../../../../src/app.js';
import { assert } from 'chai';
import { th } from '../../../helpers/index.js';
import { DateTime } from 'luxon';

describe('/homeTracker/histogramDataPublic', () => {
    beforeEach('Flush ELK', th.elk.flush);

    it('should cache the data for 5 minutes', async () => {
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

        const response1 = await request(app)
            .post('/homeTracker/histogramDataPublic')
            .set('Accept', 'application/json')
            .send({ timeWindow: '3h' })
            .expect(200);

        const { histogramData: histogramData1 } = response1.body;

        // Change logs in ELK, just to check that the response is cached and won't change
        await th.elk.flush();
        await th.elk.fixture({
            // Create logs every 5 minutes for the past 1 hour
            'data-home-tracker': new Array(1 * 6 * 2)
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

        const response2 = await request(app)
            .post('/homeTracker/histogramDataPublic')
            .set('Accept', 'application/json')
            .send({ timeWindow: '3h' })
            .expect(200);

        const { histogramData: histogramData2 } = response2.body;
        assert.deepEqual(histogramData1, histogramData2);
    });
});
