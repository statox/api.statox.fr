import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';

describe('cookbook/getRecipe', () => {
    it('Should return an error when calling with an unkown id', async () => {
        await th.mysql.fixture({
            Cookbook_Ingredient: [
                { id: 1, name: 'carot' },
                { id: 2, name: 'sugar' },
                { id: 3, name: 'lemon' }
            ],
            Cookbook_Recipe: [
                {
                    id: 1,
                    name: 'Carot Cake',
                    content: 'A long description of how to make a carot cake',
                    creationDateUnix: 0,
                    updateDateUnix: 0
                }
            ],
            Cookbook_Recipe_Ingredient: []
        });

        await request(app)
            .post('/cookbook/getRecipe')
            .set('Accept', 'application/json')
            .send({ recipeId: 99 })
            .expect(400)
            .then((response) => {
                assert.equal(response.text, '{"message":"RECIPE_ID_NOT_FOUND"}');
            });
    });
    it('Should retrieve the recipe when without ingredients', async () => {
        await th.mysql.fixture({
            Cookbook_Ingredient: [
                { id: 1, name: 'carot' },
                { id: 2, name: 'sugar' },
                { id: 3, name: 'lemon' }
            ],
            Cookbook_Recipe: [
                {
                    id: 1,
                    name: 'Carot Cake',
                    content: 'A long description of how to make a carot cake',
                    creationDateUnix: 0,
                    updateDateUnix: 0
                }
            ],
            Cookbook_Recipe_Ingredient: []
        });

        await request(app)
            .post('/cookbook/getRecipe')
            .set('Accept', 'application/json')
            .send({ recipeId: 1 })
            .expect(200)
            .then((response) => {
                assert.deepEqual(response.body, {
                    id: 1,
                    name: 'Carot Cake',
                    content: 'A long description of how to make a carot cake',
                    creationDateUnix: 0,
                    updateDateUnix: 0,
                    ingredients: []
                });
            });
    });

    it('Should retrieve the recipe its content and its ingredients', async () => {
        await th.mysql.fixture({
            Cookbook_Ingredient: [
                { id: 1, name: 'carot' },
                { id: 2, name: 'sugar' },
                { id: 3, name: 'lemon' }
            ],
            Cookbook_Recipe: [
                {
                    id: 1,
                    name: 'Carot Cake',
                    content: 'A long description of how to make a carot cake',
                    creationDateUnix: 0,
                    updateDateUnix: 0
                },
                {
                    id: 2,
                    name: 'Lemon Cake',
                    content: 'The description for another cake',
                    creationDateUnix: 1000,
                    updateDateUnix: 1000
                }
            ],
            Cookbook_Recipe_Ingredient: [
                {
                    recipeId: 1,
                    ingredientId: 1,
                    quantity: 2
                },
                {
                    id: 2,
                    recipeId: 1,
                    ingredientId: 2,
                    quantity: 100,
                    unit: 'g'
                },
                {
                    id: 3,
                    recipeId: 2,
                    ingredientId: 2,
                    quantity: 100,
                    unit: 'g'
                },
                {
                    id: 4,
                    recipeId: 2,
                    ingredientId: 3,
                    quantity: 3
                }
            ]
        });

        await request(app)
            .post('/cookbook/getRecipe')
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
