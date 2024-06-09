import sinon from 'sinon';
import { slogCheckLog } from '../../helpers/slog';
import { periodicMeteoFranceCheck } from '../../../src/services/meteofrance';
import * as meteoFranceConnector from '../../../src/services/meteofrance/connector';

describe('meteofrance', () => {
    let stub: sinon.SinonStub;
    beforeEach(() => {
        stub = sinon.stub(meteoFranceConnector, 'getLatestObservationForHourlyStation');

        // [{"lat":48.854833,"lon":2.233667,"geo_id_insee":"75116008","reference_time":"2024-06-09T14:10:06Z","insert_time":"2024-06-09T14:03:40Z","validity_time":"2024-06-09T14:00:00Z","t":294.75,"td":282.95,"tx":294.85,"tn":292.45,"u":47,"ux":51,"un":43,"dd":340,"ff":4.0,"dxy":360,"fxy":4.2,"dxi":360,"fxi":7.9,"rr1":0,"t_10":null,"t_20":null,"t_50":null,"t_100":null,"vv":null,"etat_sol":null,"sss":null,"n":null,"insolh":35,"ray_glo01":2344000,"pres":null,"pmer":null}]
        const observation = {
            lat: 48.854833,
            lon: 2.233667,
            geo_id_insee: '75116008',
            reference_time: '2024-06-09T14:10:06Z',
            insert_time: '2024-06-09T14:03:40Z',
            validity_time: '2024-06-09T14:00:00Z',
            t: 294.15,
            td: 295.15,
            tx: 296.15,
            tn: 297.15,
            u: 47,
            ux: 51,
            un: 43,
            dd: 340,
            ff: 4.0,
            dxy: 360,
            fxy: 4.2,
            dxi: 360,
            fxi: 7.9,
            rr1: 0,
            t_10: null,
            t_20: null,
            t_50: null,
            t_100: null,
            vv: null,
            etat_sol: null,
            sss: null,
            n: null,
            insolh: 35,
            ray_glo01: 2344000,
            pres: null,
            pmer: null
        };
        stub.withArgs('75116008').resolves(observation);
    });
    afterEach(() => {
        stub.restore();
    });

    it('should get an observation and log it but not repeat the log if the timestamp doesnt change on second call', async () => {
        await periodicMeteoFranceCheck();

        slogCheckLog('meteo-france', 'Attempting to get an observation', {
            previousTimestamp: 0
        });
        slogCheckLog('meteo-france', 'New observation', {
            station: 'LONGCHAMP',
            timestamp: 1717942206,
            tempCelsius: 21,
            humidity: 47
        });

        await periodicMeteoFranceCheck();
        slogCheckLog('meteo-france', 'Attempting to get an observation', {
            previousTimestamp: 1717942206
        });

        slogCheckLog('meteo-france', 'Observation timestamp did not change', {
            previousTimestamp: 1717942206
        });
    });
});
