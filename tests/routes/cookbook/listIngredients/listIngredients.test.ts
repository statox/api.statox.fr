import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';
import { cookbookFixture } from '../cookbook_fixtures.js';

describe('/cookbook/listIngredients', () => {
    it('should return all ingredients', async () => {
        await th.mysql.fixture(cookbookFixture);

        await request(app)
            .get('/cookbook/listIngredients')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                assert.sameDeepMembers(response.body.ingredients, [
                    { id: 1, name: 'carot' },
                    { id: 2, name: 'sugar' },
                    { id: 3, name: 'lemon' }
                ]);
            });
    });
});
