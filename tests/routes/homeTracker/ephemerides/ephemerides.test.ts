import request from 'supertest';
import { app } from '../../../../src/app.js';
import { assert } from 'chai';
import { th } from '../../../helpers/index.js';

describe('/homeTracker/getEphemerides', () => {
    /*
     * We consider that the libraries we are using to get lunar and sun data are
     * already well tested so we just need to validate the shape of our response
     */
    it('Known date', async () => {
        th.time.fakeSinonDateTimeNow(2208992460);
        await request(app)
            .get('/homeTracker/getEphemerides')
            .expect(200)
            .then((response) => {
                const { ephemerides } = response.body;
                assert.deepEqual(ephemerides, {
                    lunarAge: 16.332034465381327,
                    lunarAgePercent: 0.5530548402257409,
                    moonPhase: 'Full',
                    moonPhaseFr: 'Pleine lune',
                    moonVisibilityWindow: ['18:00', '06:00'],
                    sunrise: 2209016627638,
                    sunset: 2209046760718,
                    solarNoon: 2209031694178,
                    goldenHour: 2209043488487
                });
            });
        th.time.restoreDateTimeNow();
    });
});
