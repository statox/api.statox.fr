import { MysqlFixture } from '../../helpers/mysql/types.js';

export const cookbookFixture: MysqlFixture = {
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
        },
        {
            id: 3,
            name: 'Tarte Tatin',
            content: 'A recipe without ingredients',
            creationDateUnix: 2000,
            updateDateUnix: 2000
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
};
