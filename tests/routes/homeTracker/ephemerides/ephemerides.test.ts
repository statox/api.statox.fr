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
        const response = await request(app)
            .get('/homeTracker/getEphemerides')
            .expect(200);

        const { ephemerides } = response.body;

        assert.deepEqual(ephemerides, {
            moonState: {
                lunarAge: 16.332034465381327,
                lunarAgePercent: 0.5530548402257409,
                moonPhase: 'Full',
                moonPhaseFr: 'Pleine lune',
                moonVisibilityWindow: ['18:00', '06:00'],
            },
            sunState: {
                sunrise: 2209016627638,
                sunset: 2209046760718,
                solarNoon: 2209031694178,
                goldenHour: 2209043488487,
            },
            upcomingLunarStates: [
                {
                    tsMillis:2208992460000,
                    lunarState: {
                        lunarAge: 16.332034465381327,
                        lunarAgePercent: 0.5530548402257409,
                        moonPhase: 'Full',
                        moonPhaseFr: 'Pleine lune',
                        moonVisibilityWindow: ['18:00', '06:00']
                    }
                },
                {
                    tsMillis:2209078860000,
                    lunarState: {
                        lunarAge: 17.332034465381543,
                        lunarAgePercent: 0.5869180335344595,
                        moonPhase: 'Waning Gibbous',
                        moonPhaseFr: 'Gibeuse décroissante',
                        moonVisibilityWindow: [ '21:00', '09:00' ]
                    }
                },
                {
                    tsMillis:2209165260000,
                    lunarState: {
                        lunarAge: 18.332034465381764,
                        lunarAgePercent: 0.620781226843178,
                        moonPhase: 'Waning Gibbous',
                        moonPhaseFr: 'Gibeuse décroissante',
                        moonVisibilityWindow: [ '21:00', '09:00' ]
                    }
                },
                {
                    tsMillis:2209251660000,
                    lunarState: {
                        lunarAge: 19.33203446538198,
                        lunarAgePercent: 0.6546444201518966,
                        moonPhase: 'Waning Gibbous',
                        moonPhaseFr: 'Gibeuse décroissante',
                        moonVisibilityWindow: [ '21:00', '09:00' ]
                    }
                },
                {
                    tsMillis:2209338060000,
                    lunarState: {
                        lunarAge: 20.3320344653822,
                        lunarAgePercent: 0.6885076134606152,
                        moonPhase: 'Last Quarter',
                        moonPhaseFr: 'Dernier quartier',
                        moonVisibilityWindow: [ '00:00', '12:00' ]
                    }
                },
                {
                    tsMillis:2209424460000,
                    lunarState: {
                        lunarAge: 21.332034465382417,
                        lunarAgePercent: 0.7223708067693337,
                        moonPhase: 'Last Quarter',
                        moonPhaseFr: 'Dernier quartier',
                        moonVisibilityWindow: [ '00:00', '12:00' ]
                    }
                },
                {
                    tsMillis:2209510860000,
                    lunarState: {
                        lunarAge: 22.332034465382637,
                        lunarAgePercent: 0.7562340000780523,
                        moonPhase: 'Last Quarter',
                        moonPhaseFr: 'Dernier quartier',
                        moonVisibilityWindow: [ '00:00', '12:00' ]
                    }
                },
                {
                    tsMillis:2209597260000,
                    lunarState: {
                        lunarAge: 23.332034465382854,
                        lunarAgePercent: 0.7900971933867709,
                        moonPhase: 'Last Quarter',
                        moonPhaseFr: 'Dernier quartier',
                        moonVisibilityWindow: [ '00:00', '12:00' ]
                    }
                },
                {
                    tsMillis:2209683660000,
                    lunarState: {
                        lunarAge: 24.332034465381398,
                        lunarAgePercent: 0.8239603866954326,
                        moonPhase: 'Waning Crescent',
                        moonPhaseFr: 'Dernier croissant',
                        moonVisibilityWindow: [ '03:00', '15:00' ]
                    }
                },
                {
                    tsMillis:2209770060000,
                    lunarState: {
                        lunarAge: 25.332034465381614,
                        lunarAgePercent: 0.8578235800041512,
                        moonPhase: 'Waning Crescent',
                        moonPhaseFr: 'Dernier croissant',
                        moonVisibilityWindow: [ '03:00', '15:00' ]
                    }
                },
                {
                    tsMillis:2209856460000,
                    lunarState: {
                        lunarAge: 26.332034465381835,
                        lunarAgePercent: 0.8916867733128697,
                        moonPhase: 'Waning Crescent',
                        moonPhaseFr: 'Dernier croissant',
                        moonVisibilityWindow: [ '03:00', '15:00' ]
                    }
                },
                {
                    tsMillis:2209942860000,
                    lunarState: {
                        lunarAge: 27.33203446538205,
                        lunarAgePercent: 0.9255499666215883,
                        moonPhase: 'Waning Crescent',
                        moonPhaseFr: 'Dernier croissant',
                        moonVisibilityWindow: [ '03:00', '15:00' ]
                    }
                },
                {
                    tsMillis:2210029260000,
                    lunarState: {
                        lunarAge: 28.33203446538227,
                        lunarAgePercent: 0.9594131599303068,
                        moonPhase: 'New',
                        moonPhaseFr: 'Nouvelle lune',
                        moonVisibilityWindow: [ '06:00', '18:00' ]
                    }
                },
                {
                    tsMillis:2210115660000,
                    lunarState: {
                        lunarAge: 29.33203446538249,
                        lunarAgePercent: 0.9932763532390254,
                        moonPhase: 'New',
                        moonPhaseFr: 'Nouvelle lune',
                        moonVisibilityWindow: [ '06:00', '18:00' ]
                    }
                },
                {
                    tsMillis:2210202060000,
                    lunarState: {
                        lunarAge: 0.8014467596227095,
                        lunarAgePercent: 0.027139546547743976,
                        moonPhase: 'New',
                        moonPhaseFr: 'Nouvelle lune',
                        moonVisibilityWindow: [ '06:00', '18:00' ]
                    }
                },
                {
                    tsMillis:2210288460000,
                    lunarState: {
                        lunarAge: 1.8014467596212496,
                        lunarAgePercent: 0.0610027398564057,
                        moonPhase: 'New',
                        moonPhaseFr: 'Nouvelle lune',
                        moonVisibilityWindow: [ '06:00', '18:00' ]
                    }
                },
                {
                    tsMillis:2210374860000,
                    lunarState: {
                        lunarAge: 2.8014467596214683,
                        lunarAgePercent: 0.09486593316512426,
                        moonPhase: 'Waxing Crescent',
                        moonPhaseFr: 'Premier croissant',
                        moonVisibilityWindow: [ '09:00', '21:00' ]
                    }
                },
                {
                    tsMillis:2210461260000,
                    lunarState: {
                        lunarAge: 3.8014467596216868,
                        lunarAgePercent: 0.12872912647384283,
                        moonPhase: 'Waxing Crescent',
                        moonPhaseFr: 'Premier croissant',
                        moonVisibilityWindow: [ '09:00', '21:00' ]
                    }
                },
                {
                    tsMillis:2210547660000,
                    lunarState: {
                        lunarAge: 4.801446759621905,
                        lunarAgePercent: 0.1625923197825614,
                        moonPhase: 'Waxing Crescent',
                        moonPhaseFr: 'Premier croissant',
                        moonVisibilityWindow: [ '09:00', '21:00' ]
                    }
                },
                {
                    tsMillis:2210634060000,
                    lunarState: {
                        lunarAge: 5.801446759622125,
                        lunarAgePercent: 0.19645551309127995,
                        moonPhase: 'First Quarter',
                        moonPhaseFr: 'Premier quartier',
                        moonVisibilityWindow: [ '12:00', '00:00' ]
                    }
                },
                {
                    tsMillis:2210720460000,
                    lunarState: {
                        lunarAge: 6.801446759622343,
                        lunarAgePercent: 0.23031870639999852,
                        moonPhase: 'First Quarter',
                        moonPhaseFr: 'Premier quartier',
                        moonVisibilityWindow: [ '12:00', '00:00' ]
                    }
                },
                {
                    tsMillis:2210806860000,
                    lunarState: {
                        lunarAge: 7.801446759622562,
                        lunarAgePercent: 0.2641818997087171,
                        moonPhase: 'First Quarter',
                        moonPhaseFr: 'Premier quartier',
                        moonVisibilityWindow: [ '12:00', '00:00' ]
                    }
                },
                {
                    tsMillis:2210893260000,
                    lunarState: {
                        lunarAge: 8.801446759622781,
                        lunarAgePercent: 0.29804509301743565,
                        moonPhase: 'First Quarter',
                        moonPhaseFr: 'Premier quartier',
                        moonVisibilityWindow: [ '12:00', '00:00' ]
                    }
                },
                {
                    tsMillis:2210979660000,
                    lunarState: {
                        lunarAge: 9.80144675962132,
                        lunarAgePercent: 0.33190828632609737,
                        moonPhase: 'Waxing Gibbous',
                        moonPhaseFr: 'Gibeuse croissante',
                        moonVisibilityWindow: [ '15:00', '03:00' ]
                    }
                },
                {
                    tsMillis:2211066060000,
                    lunarState: {
                        lunarAge: 10.80144675962154,
                        lunarAgePercent: 0.36577147963481593,
                        moonPhase: 'Waxing Gibbous',
                        moonPhaseFr: 'Gibeuse croissante',
                        moonVisibilityWindow: [ '15:00', '03:00' ]
                    }
                },
                {
                    tsMillis:2211152460000,
                    lunarState: {
                        lunarAge: 11.801446759621758,
                        lunarAgePercent: 0.3996346729435345,
                        moonPhase: 'Waxing Gibbous',
                        moonPhaseFr: 'Gibeuse croissante',
                        moonVisibilityWindow: [ '15:00', '03:00' ]
                    }
                },
                {
                    tsMillis:2211238860000,
                    lunarState: {
                        lunarAge: 12.801446759621976,
                        lunarAgePercent: 0.43349786625225306,
                        moonPhase: 'Waxing Gibbous',
                        moonPhaseFr: 'Gibeuse croissante',
                        moonVisibilityWindow: [ '15:00', '03:00' ]
                    }
                },
                {
                    tsMillis:2211325260000,
                    lunarState: {
                        lunarAge: 13.801446759622195,
                        lunarAgePercent: 0.4673610595609716,
                        moonPhase: 'Full',
                        moonPhaseFr: 'Pleine lune',
                        moonVisibilityWindow: [ '18:00', '06:00' ]
                    }
                },
                {
                    tsMillis:2211411660000,
                    lunarState: {
                        lunarAge: 14.801446759622413,
                        lunarAgePercent: 0.5012242528696902,
                        moonPhase: 'Full',
                        moonPhaseFr: 'Pleine lune',
                        moonVisibilityWindow: [ '18:00', '06:00' ]
                    }
                },
                {
                    tsMillis:2211498060000,
                    lunarState: {
                        lunarAge: 15.801446759622632,
                        lunarAgePercent: 0.5350874461784088,
                        moonPhase: 'Full',
                        moonPhaseFr: 'Pleine lune',
                        moonVisibilityWindow: [ '18:00', '06:00' ]
                    }
                }
            ]
        });

        th.time.restoreDateTimeNow();
    });
});
