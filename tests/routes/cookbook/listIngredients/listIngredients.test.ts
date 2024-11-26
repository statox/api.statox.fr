import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';

describe('/cookbook/listIngredients', () => {
    it('should return all ingredients', async () => {
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
                    id: 1,
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
