import request from 'supertest';
import { mysqlCheckContains, mysqlFixture } from '../../../helpers';
import { app } from '../../../..';
import { expect } from 'chai';

describe('clipboard/addEntry', () => {
    it('should not create duplicate entry', async () => {
        await mysqlFixture({
            Clipboard: [
                {
                    id: 1,
                    name: 'A cool entry',
                    content: 'Look at that content',
                    creationDateUnix: 10,
                    ttl: 100,
                    linkId: 'aabbccdd'
                }
            ]
        });

        await request(app)
            .post('/clipboard/addEntry')
            .set('Accept', 'application/json')
            .send({
                name: 'A cool entry',
                content: 'Foo'
            })
            .expect(400)
            .then((response) => {
                expect(response.body === 'ER_DUP_ENTRY');
            });

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'A cool entry',
                    content: 'Look at that content',
                    creationDateUnix: 10
                }
            ]
        });
    });

    it('should create new private entry with default ttl to 5 minutes', async () => {
        await request(app)
            .post('/clipboard/addEntry')
            .set('Accept', 'application/json')
            .send({
                name: 'A cool entry',
                content: 'Look at that content'
            })
            .expect(200);

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'A cool entry',
                    content: 'Look at that content',
                    ttl: 60 * 5,
                    isPublic: 0,
                    creationDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    }
                }
            ]
        });
    });

    it('should create new public entry with custom ttl', async () => {
        await request(app)
            .post('/clipboard/addEntry')
            .set('Accept', 'application/json')
            .send({
                name: 'A cool entry',
                content: 'Look at that content',
                ttlSeconds: 60,
                isPublic: true
            })
            .expect(200);

        await mysqlCheckContains({
            Clipboard: [
                {
                    name: 'A cool entry',
                    content: 'Look at that content',
                    ttl: 60,
                    isPublic: 1,
                    creationDateUnix: {
                        aroundTimestamp: 'NOW()',
                        precision: '1 SECOND'
                    }
                }
            ]
        });
    });

    it('WIP - should create new with a file', async () => {
        const buffer = Buffer.from('some data');

        await request(app)
            .post('/clipboard/addEntry')
            .set('content-type', 'multipart/form-data')
            .field('name', 'entry name')
            .field('content', 'entry content')
            .attach('file', buffer)
            .expect(200);
    });
});
