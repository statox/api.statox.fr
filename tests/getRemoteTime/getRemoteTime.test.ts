import request from 'supertest';
import { expect } from 'chai';
import { app } from '../..';

describe('getRemoteTime', () => {
    it('should return a timestamp close to now', () => {
        const now = Date.now();
        request(app)
            .get('/')
            .expect(200)
            .then((response) => {
                expect(response.body.time).greaterThan(now - 1000);
                expect(response.body.time).lessThan(now + 1000);
            });
    });
});
