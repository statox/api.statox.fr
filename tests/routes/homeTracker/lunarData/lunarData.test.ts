import request from 'supertest';
import { app } from '../../../../src/app';
import { assert } from 'chai';
import { th } from '../../../helpers';

describe('/homeTracker/getLunarData', () => {
    /*
     * Let's consider that the library we are using to get lunar phases is
     * already well tested so we just need to validate the shape of our response
     */
    it('Known date', async () => {
        th.time.fakeSinonDateTimeNow(2208992460);
        await request(app)
            .get('/homeTracker/getLunarData')
            .expect(200)
            .then((response) => {
                const { currentLunarState } = response.body;
                assert.deepEqual(currentLunarState, {
                    lunarAge: 16.373701132359034,
                    lunarAgePercent: 0.5544658066241368,
                    phase: 'Full',
                    phaseFr: 'Pleine lune',
                    visibilityWindow: ['18:00', '06:00']
                });
            });
        th.time.restoreDateTimeNow();
    });
});
