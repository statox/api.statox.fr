import { OkPacket, QueryError, RowDataPacket } from 'mysql2';
import { db } from '../../databases/db.js';
import { ItemAlreadyExistsError } from '../../routes/errors.js';
import { DuplicateIngredientError } from './errors.js';

interface NewRecipeParams {
    name: string;
    content: string;
    ingredients: {
        name: string;
        quantity?: number;
        unit?: string;
    }[];
}

export const addRecipe = async (newRecipe: NewRecipeParams) => {
    const { name, content, ingredients } = newRecipe;

    const ingredientsName = new Set();
    for (const ingredient of ingredients) {
        if (ingredientsName.has(ingredient.name)) {
            throw new DuplicateIngredientError(ingredient.name);
        }
    }

    const conn = await db.getConnection();

    try {
        /*
         * Create the recipe and get its ID
         */
        const createdRecipe = await conn.query(
            `
INSERT INTO Cookbook_Recipe (name, content, creationDateUnix, updateDateUnix)
VALUES (?, ?, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())
`,
            [name, content]
        );

        const newRecipeId = (createdRecipe[0] as OkPacket).insertId!;
        console.log('Create new recipe with id', newRecipeId);

        /*
         * For each ingredient, either create it or get its id if it already exists
         * Then create the association with the recipe
         */
        for (const ingredient of ingredients) {
            const createdIngredient = await conn.query(
                `
INSERT INTO Cookbook_Ingredient (name) VALUES (?)
ON DUPLICATE KEY UPDATE name = VALUES(name);
`,
                [ingredient.name]
            );

            const ingredientQueryResult = createdIngredient[0] as OkPacket;

            let ingredientId: number;

            if (ingredientQueryResult.affectedRows === 1 && ingredientQueryResult.insertId > 0) {
                ingredientId = ingredientQueryResult.insertId;
            } else {
                const [existingIngredient] = await conn.query<({ id: number } & RowDataPacket)[]>(
                    'SELECT id FROM Cookbook_Ingredient WHERE name = ?',
                    [ingredient.name]
                );
                ingredientId = existingIngredient[0].id;
            }

            await conn.query(
                `
INSERT INTO Cookbook_Recipe_Ingredient
(recipeId, ingredientId, quantity, unit)
VALUES (?, ?, ?, ?)
`,
                [newRecipeId, ingredientId, ingredient.quantity, ingredient.unit]
            );
        }
    } catch (error) {
        await conn.rollback();
        if ((error as QueryError).code === 'ER_DUP_ENTRY') {
            throw new ItemAlreadyExistsError();
        }
        throw error;
    } finally {
        conn.release();
    }
};
