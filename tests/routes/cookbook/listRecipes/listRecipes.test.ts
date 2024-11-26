import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';
import { cookbookFixture } from '../cookbook_fixtures.js';

describe('/cookbook/listRecipes', () => {
    it('should return all recipes without their details', async () => {
        await th.mysql.fixture(cookbookFixture);

        await request(app)
            .get('/cookbook/listRecipes')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {
                    recipes: [
                        { id: 1, name: 'Carot Cake', creationDateUnix: 0, updateDateUnix: 0 },
                        { id: 2, name: 'Lemon Cake', creationDateUnix: 1000, updateDateUnix: 1000 },
                        { id: 3, name: 'Tarte Tatin', creationDateUnix: 2000, updateDateUnix: 2000 }
                    ]
                });
            });
    });
});
