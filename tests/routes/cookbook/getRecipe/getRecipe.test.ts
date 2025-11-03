import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';
import { cookbookFixture } from '../cookbook_fixtures.js';

describe('/cookbook/getRecipe', () => {
    it('Should return an error when calling with an unkown id', async () => {
        await th.mysql.fixture(cookbookFixture);

        await request(app)
            .post('/cookbook/getRecipe')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({ recipeId: 99 })
            .expect(400)
            .then((response) => {
                assert.equal(response.text, '{"message":"RECIPE_ID_NOT_FOUND"}');
            });
    });
    it('Should retrieve the recipe when without ingredients', async () => {
        await th.mysql.fixture(cookbookFixture);

        await request(app)
            .post('/cookbook/getRecipe')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({ recipeId: 3 })
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {
                    id: 3,
                    name: 'Tarte Tatin',
                    content: 'A recipe without ingredients',
                    creationDateUnix: 2000,
                    updateDateUnix: 2000,
                    ingredients: []
                });
            });
    });

    it('Should retrieve the recipe its content and its ingredients', async () => {
        await th.mysql.fixture(cookbookFixture);

        await request(app)
            .post('/cookbook/getRecipe')
            .set('Cookie', th.auth2.getPassportSessionCookie())
            .set('Accept', 'application/json')
            .send({ recipeId: 2 })
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {
                    id: 2,
                    name: 'Lemon Cake',
                    content: 'The description for another cake',
                    creationDateUnix: 1000,
                    updateDateUnix: 1000,
                    ingredients: [
                        {
                            id: 2,
                            name: 'sugar',
                            quantity: 100,
                            unit: 'g'
                        },
                        {
                            id: 3,
                            name: 'lemon',
                            quantity: 3,
                            unit: null
                        }
                    ]
                });
            });
    });
});
