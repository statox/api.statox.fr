import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';

describe('cookbook/addRecipe', () => {
    describe('should reject a new recipe', () => {
        it('With identical name', async () => {
            await request(app)
                .post('/cookbook/addRecipe')
                .set('Accept', 'application/json')
                .send({
                    name: 'Carot Cake',
                    content: 'V1',
                    ingredients: []
                })
                .expect(200);

            await request(app)
                .post('/cookbook/addRecipe')
                .set('Accept', 'application/json')
                .send({
                    name: 'Carot Cake',
                    content: 'V2',
                    ingredients: []
                })
                .expect(400);

            await th.mysql.checkTableLength('Cookbook_Recipe', 1);
        });
    });
    describe('should successfully create a new recipe', () => {
        it('Without ingredients', async () => {
            // This is probably a case we want to forbid in the future

            await th.mysql.fixture({
                Cookbook_Recipe: [
                    {
                        id: 1,
                        name: 'foo',
                        content: 'bar',
                        creationDateUnix: 0,
                        updateDateUnix: 0
                    }
                ]
            });

            await request(app)
                .post('/cookbook/addRecipe')
                .set('Accept', 'application/json')
                .send({
                    name: 'Carot Cake',
                    content: 'The text of the recipe, potentially much longer than that',
                    ingredients: []
                })
                .expect(200);

            await th.mysql.checkContains({
                Cookbook_Recipe: [
                    {
                        id: 2,
                        name: 'Carot Cake',
                        content: 'The text of the recipe, potentially much longer than that',
                        creationDateUnix: th.mysql.aroundNowSec,
                        updateDateUnix: th.mysql.aroundNowSec
                    }
                ]
            });
        });

        it('With a mix of new and existing ingredients', async () => {
            await th.mysql.fixture({
                Cookbook_Recipe: [
                    {
                        name: 'foo',
                        content: 'bar',
                        creationDateUnix: 0,
                        updateDateUnix: 0
                    }
                ],
                Cookbook_Ingredient: [
                    {
                        name: 'sugar'
                    }
                ]
            });

            await request(app)
                .post('/cookbook/addRecipe')
                .set('Accept', 'application/json')
                .send({
                    name: 'Carot Cake',
                    content: 'The text of the recipe, potentially much longer than that',
                    ingredients: [
                        {
                            name: 'sugar',
                            quantity: 100,
                            unit: 'g'
                        },
                        {
                            name: 'carot',
                            quantity: 2
                        }
                    ]
                })
                .expect(200);

            await th.mysql.checkContains({
                Cookbook_Recipe: [
                    {
                        id: 2,
                        name: 'Carot Cake',
                        content: 'The text of the recipe, potentially much longer than that',
                        creationDateUnix: th.mysql.aroundNowSec,
                        updateDateUnix: th.mysql.aroundNowSec
                    }
                ],
                Cookbook_Ingredient: [
                    {
                        id: 1,
                        name: 'sugar'
                    },
                    {
                        id: 2,
                        name: 'carot'
                    }
                ],
                Cookbook_Recipe_Ingredient: [
                    {
                        recipeId: 1,
                        ingredientId: 1,
                        quantity: 100,
                        unit: 'g'
                    },
                    {
                        recipeId: 1,
                        ingredientId: 2,
                        quantity: 2
                    }
                ]
            });
        });
    });
});
