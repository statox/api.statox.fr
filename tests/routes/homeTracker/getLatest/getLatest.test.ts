import request from 'supertest';
import { app } from '../../../../src/app';
import { getLatestData, ingestSensorData } from '../../../../src/libs/modules/homeTracker';
import { assert } from 'chai';

describe('homeTracker/getLatest', () => {
    it('should return correct data', async () => {
        const jardiniere1 = {
            sensorName: 'jardiniere',
            batteryCharge: 4.2,
            batteryPercent: 100,
            humidity: 30,
            tempCelsius: 22
        };
        const jardiniere2 = {
            sensorName: 'jardiniere',
            batteryCharge: 4.2,
            batteryPercent: 100,
            humidity: 30,
            tempCelsius: 22
        };
        const salon1 = {
            sensorName: 'salon',
            batteryCharge: 4.2,
            batteryPercent: 100,
            humidity: 30,
            tempCelsius: 21
        };
        const salon2 = {
            sensorName: 'salon',
            batteryCharge: 4.2,
            batteryPercent: 100,
            humidity: 30,
            tempCelsius: 22
        };
        await ingestSensorData(jardiniere1);
        await ingestSensorData(salon1);
        await ingestSensorData(salon2);
        await ingestSensorData(jardiniere2);

        await getLatestData();

        await request(app)
            .get('/homeTracker/getLatest')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer fakeaccesskeyfortests')
            .expect(200)
            .then((response) => {
                const { recordsBySensor } = response.body;
                assert.lengthOf(Object.keys(recordsBySensor), 2);

                assert.sameDeepMembers(
                    recordsBySensor['salon'].map((v: { document: unknown }) => v.document),
                    [salon1, salon2]
                );
                assert.sameDeepMembers(
                    recordsBySensor['jardiniere'].map((v: { document: unknown }) => v.document),
                    [jardiniere1, jardiniere2]
                );
            });
    });
});
