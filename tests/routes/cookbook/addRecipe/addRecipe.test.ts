import request from 'supertest';
import { app } from '../../../../src/app.js';
import { th } from '../../../helpers/index.js';
import { assert } from 'chai';
import { cookbookFixture } from '../cookbook_fixtures.js';

describe('cookbook/addRecipe', () => {
    describe('should reject a new recipe', () => {
        it('With identical name', async () => {
            await th.mysql.fixture(cookbookFixture);

            await request(app)
                .post('/cookbook/addRecipe')
                .set('Accept', 'application/json')
                .send({
                    name: 'Carot Cake',
                    content: 'V2',
                    ingredients: []
                })
                .expect(400)
                .then((response) => {
                    assert.equal(response.text, '{"message":"ITEM_ALREADY_EXISTS"}');
                });

            await th.mysql.checkTableLength('Cookbook_Recipe', 3);

            th.slog.checkLog('app', 'access-log', {
                context: {
                    cookbook_newRecipeName: 'Carot Cake'
                }
            });
        });

        it('With duplicate ingredients', async () => {
            await th.mysql.fixture(cookbookFixture);

            await request(app)
                .post('/cookbook/addRecipe')
                .set('Accept', 'application/json')
                .send({
                    name: 'New recipe',
                    content: 'content',
                    ingredients: [
                        {
                            name: 'carot',
                            quantity: 1
                        },
                        {
                            name: 'carot',
                            quantity: 2
                        }
                    ]
                })
                .expect(400)
                .then((response) => {
                    assert.equal(response.text, '{"message":"INGREDIENT_INCLUDED_MORE_THAN_ONCE"}');
                });

            await th.mysql.checkTableLength('Cookbook_Recipe', 3);
            await th.mysql.checkTableLength('Cookbook_Ingredient', 3);
            await th.mysql.checkTableLength('Cookbook_Recipe_Ingredient', 4);

            th.slog.checkLog('app', 'access-log', {
                context: {
                    cookbook_newRecipeName: 'New recipe',
                    cookbook_duplicateIngredient: 'carot'
                }
            });
        });
    });

    describe('should successfully create a new recipe', () => {
        it('Without ingredients', async () => {
            // This is probably a case we want to forbid in the future

            await th.mysql.fixture(cookbookFixture);

            await request(app)
                .post('/cookbook/addRecipe')
                .set('Accept', 'application/json')
                .send({
                    name: 'New recipe',
                    content: 'The text of the recipe, potentially much longer than that',
                    ingredients: []
                })
                .expect(200);

            await th.mysql.checkContains({
                Cookbook_Recipe: [
                    {
                        id: 4,
                        name: 'New recipe',
                        content: 'The text of the recipe, potentially much longer than that',
                        creationDateUnix: th.mysql.aroundNowSec,
                        updateDateUnix: th.mysql.aroundNowSec
                    }
                ]
            });

            th.slog.checkLog('app', 'access-log', {
                context: {
                    cookbook_newRecipeName: 'New recipe',
                    cookbook_nbIngredients: 0,
                    cookbook_newRecipeId: 4
                }
            });
        });

        it('With a mix of new and existing ingredients', async () => {
            await th.mysql.fixture(cookbookFixture);

            await request(app)
                .post('/cookbook/addRecipe')
                .set('Accept', 'application/json')
                .send({
                    name: 'New recipe',
                    content: 'The text of the recipe, potentially much longer than that',
                    ingredients: [
                        {
                            name: 'sugar',
                            quantity: 100,
                            unit: 'g'
                        },
                        {
                            name: 'new ingredient',
                            quantity: 2
                        }
                    ]
                })
                .expect(200);

            await th.mysql.checkTableLength('Cookbook_Recipe', 4);

            await th.mysql.checkContains({
                Cookbook_Recipe: [
                    {
                        id: 4,
                        name: 'New recipe',
                        content: 'The text of the recipe, potentially much longer than that',
                        creationDateUnix: th.mysql.aroundNowSec,
                        updateDateUnix: th.mysql.aroundNowSec
                    }
                ],
                Cookbook_Ingredient: [
                    {
                        id: 2,
                        name: 'sugar'
                    },
                    {
                        // Note that id becomes 3 because the duplicate "sugar" bumps the auto increment key
                        id: 5,
                        name: 'new ingredient'
                    }
                ],
                Cookbook_Recipe_Ingredient: [
                    {
                        recipeId: 4,
                        ingredientId: 2,
                        quantity: 100,
                        unit: 'g'
                    },
                    {
                        recipeId: 4,
                        ingredientId: 5,
                        quantity: 2
                    }
                ]
            });

            th.slog.checkLog('app', 'access-log', {
                context: {
                    cookbook_newRecipeName: 'New recipe',
                    cookbook_nbIngredients: 2,
                    cookbook_newRecipeId: 4
                }
            });
        });
    });
});
