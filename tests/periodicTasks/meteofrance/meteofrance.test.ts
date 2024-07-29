import sinon from 'sinon';
import { slogCheckLog } from '../../helpers/slog';
import { doSingleStationCheck } from '../../../src/libs/services/meteofrance';
import * as meteoFranceConnector from '../../../src/libs/services/meteofrance/connector';
import * as meteoFranceConfig from '../../../src/libs/services/meteofrance/config';

describe('periodic task - meteofrance', () => {
    let stubFailureDelayMs: sinon.SinonStub;
    let stubObservationAPI: sinon.SinonStub;
    before(() => {
        stubFailureDelayMs = sinon.stub(meteoFranceConfig, 'failureTimeoutMs');
        stubFailureDelayMs.returns(1);
        stubObservationAPI = sinon.stub(
            meteoFranceConnector,
            'getLatestObservationForHourlyStation'
        );
        // [{"lat":48.854833,"lon":2.233667,"geo_id_insee":"75116008","reference_time":"2024-06-09T14:10:06Z","insert_time":"2024-06-09T14:03:40Z","validity_time":"2024-06-09T14:00:00Z","t":294.75,"td":282.95,"tx":294.85,"tn":292.45,"u":47,"ux":51,"un":43,"dd":340,"ff":4.0,"dxy":360,"fxy":4.2,"dxi":360,"fxi":7.9,"rr1":0,"t_10":null,"t_20":null,"t_50":null,"t_100":null,"vv":null,"etat_sol":null,"sss":null,"n":null,"insolh":35,"ray_glo01":2344000,"pres":null,"pmer":null}]
        stubObservationAPI
            .withArgs('75116008')
            .onFirstCall()
            .resolves({
                reference_time: '2024-06-09T14:12:06Z',
                insert_time: '2024-06-09T14:11:06Z',
                validity_time: '2024-06-09T14:10:06Z',
                t: 294.15,
                u: 47,
                pres: 101500,
                pmer: 101000,
                dd: 180,
                ff: 10,
                rr1: 5
            })
            .resolves({
                validity_time: '2024-06-09T16:10:06Z',
                t: 296.15,
                u: 50
            });

        stubObservationAPI.withArgs('75104001').onThirdCall().resolves({
            reference_time: '2024-06-09T14:12:06Z',
            insert_time: '2024-06-09T14:11:06Z',
            validity_time: '2024-06-09T14:10:06Z',
            t: 294.15,
            u: 47
        });
    });
    after(() => {
        stubFailureDelayMs.restore();
        stubObservationAPI.restore();
    });

    it('should get an observation and log it after 2 failures', async () => {
        await doSingleStationCheck({ id: '75104001', nom: 'TOUR ST-JACQUES' });

        slogCheckLog('meteo-france', 'Attempting to get an observation', {
            previousTimestamp: 0,
            stationId: '75104001',
            stationName: 'TOUR ST-JACQUES'
        });
        slogCheckLog('meteo-france', 'Failed call', { failedCalls: 0 });
        slogCheckLog('meteo-france', 'Failed call', { failedCalls: 1 });
        slogCheckLog('meteo-france', 'New observation', {
            referenceTime: '2024-06-09T14:12:06Z',
            insertTime: '2024-06-09T14:11:06Z',
            validityTime: '2024-06-09T14:10:06Z',
            station: 'TOUR ST-JACQUES',
            observationTimestamp: 1717942206000,
            tempCelsius: 21,
            humidity: 47
        });
    });

    it('should get an observation and log it but not repeat the log if the timestamp doesnt change on second call', async () => {
        await doSingleStationCheck({ id: '75116008', nom: 'LONGCHAMP' });

        slogCheckLog('meteo-france', 'Attempting to get an observation', {
            previousTimestamp: 0,
            stationId: '75116008',
            stationName: 'LONGCHAMP'
        });
        slogCheckLog('meteo-france', 'New observation', {
            referenceTime: '2024-06-09T14:12:06Z',
            insertTime: '2024-06-09T14:11:06Z',
            validityTime: '2024-06-09T14:10:06Z',
            station: 'LONGCHAMP',
            observationTimestamp: 1717942206000,
            tempCelsius: 21,
            humidity: 47,
            pressurehPa: 1015,
            pressureSeaLevelhPa: 1010,
            meanWindDirectionDegrees: 180,
            meanWindSpeedMS: 10,
            precipitationMM: 5
        });

        await doSingleStationCheck({ id: '75116008', nom: 'LONGCHAMP' });
        slogCheckLog('meteo-france', 'Attempting to get an observation', {
            previousTimestamp: 1717942206000
        });
        slogCheckLog('meteo-france', 'New observation', {
            validityTime: '2024-06-09T16:10:06Z',
            station: 'LONGCHAMP',
            observationTimestamp: 1717949406000,
            tempCelsius: 23,
            humidity: 50
        });

        await doSingleStationCheck({ id: '75116008', nom: 'LONGCHAMP' });
        slogCheckLog('meteo-france', 'Attempting to get an observation', {
            previousTimestamp: 1717949406000
        });
        slogCheckLog('meteo-france', 'Observation timestamp did not change', {
            previousTimestamp: 1717949406000
        });
    });

    it('should stop after 5 failed calls', async () => {
        await doSingleStationCheck({ id: '00000000', nom: 'NOT A STATION' });

        slogCheckLog('meteo-france', 'Attempting to get an observation', {
            previousTimestamp: 0,
            stationId: '00000000',
            stationName: 'NOT A STATION'
        });
        slogCheckLog('meteo-france', 'Failed call', {
            failedCalls: 0,
            stationId: '00000000',
            stationName: 'NOT A STATION'
        });
        slogCheckLog('meteo-france', 'Failed call', { failedCalls: 1 });
        slogCheckLog('meteo-france', 'Failed call', { failedCalls: 2 });
        slogCheckLog('meteo-france', 'Failed call', { failedCalls: 3 });
        slogCheckLog('meteo-france', 'Failed call', { failedCalls: 4 });
        slogCheckLog('meteo-france', 'Stop retrying calls', {
            stationId: '00000000',
            stationName: 'NOT A STATION'
        });
    });
});
