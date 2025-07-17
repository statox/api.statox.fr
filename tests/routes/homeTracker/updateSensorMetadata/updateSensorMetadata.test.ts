import request from 'supertest';
import { assert } from 'chai';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';

describe('homeTracker/updateSensorMetadata', () => {
    it('Should update the metadata of an existing sensor', async () => {
        th.mysql.fixture({
            HomeTrackerSensor: [
                {
                    id: 1,
                    name: 'foo',
                    hexColor: '#FF0000',
                    sleepTimeSec: 300,
                    tempOffset: 0
                }
            ]
        });

        const newMetaData = {
            sensorName: 'foo',
            hexColor: '#00FF00',
            tempOffset: 1.1,
            sleepTimeSec: 600
        };

        await request(app)
            .post('/homeTracker/updateSensorMetadata')
            .set('Accept', 'application/json')
            .send(newMetaData)
            .expect(200);

        th.slog.checkLog('app', 'access-log', {
            path: '/homeTracker/updateSensorMetadata',
            code: 200,
            remoteIp: '::ffff:127.0.0.1',
            requestId: '00000000-0000-0000-0000-000000000001',
            requestInterrupted: false,
            context: {
                sensorName: 'foo',
                dataStr: JSON.stringify(newMetaData)
            }
        });

        await th.mysql.checkContains({
            HomeTrackerSensor: [
                {
                    id: 1,
                    name: 'foo',
                    hexColor: '#00FF00',
                    // tempOffset: 1.1, // float are approximations in mysql we can't select them properly
                    //  TODO Replace the column with decimal type and use tenth of degrees
                    sleepTimeSec: 600
                }
            ]
        });
    });

    it('Should fail for a non-existing sensor', async () => {
        th.mysql.fixture({
            HomeTrackerSensor: []
        });

        const newMetaData = {
            sensorName: 'foo',
            hexColor: '#00FF00',
            tempOffset: 1.1,
            sleepTimeSec: 600
        };

        const res = await request(app)
            .post('/homeTracker/updateSensorMetadata')
            .set('Accept', 'application/json')
            .send(newMetaData)
            .expect(400);

        assert.deepEqual(res.body, { message: 'SENSOR_NAME_DOES_NOT_EXISTS' });

        th.slog.checkLog('app', 'access-log', {
            path: '/homeTracker/updateSensorMetadata',
            code: 400,
            remoteIp: '::ffff:127.0.0.1',
            requestId: '00000000-0000-0000-0000-000000000001',
            requestInterrupted: false,
            context: {
                sensorName: 'foo',
                dataStr: JSON.stringify(newMetaData)
            }
        });
    });
});
