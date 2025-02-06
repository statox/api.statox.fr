import { RowDataPacket } from 'mysql2';
import { db } from '../../../databases/db.js';
import { RecipeWithDetails } from '../types.js';
import { RecipeNotFoundError } from '../errors.js';

export const getRecipeById = async (params: { id: number }): Promise<RecipeWithDetails> => {
    const [recipeRows] = await db.query<
        ({
            id: number;
            name: string;
            content: string;
            creationDateUnix: number;
            updateDateUnix: number;
        } & RowDataPacket)[]
    >(
        `SELECT id, name, content, creationDateUnix, updateDateUnix
        FROM Cookbook_Recipe WHERE id = ?`,
        [params.id]
    );

    const recipe = recipeRows[0];

    if (!recipe) {
        throw new RecipeNotFoundError(params.id);
    }

    const [ingredients] = await db.query<(RecipeWithDetails & RowDataPacket)[]>(
        `
        SELECT
            Ingredient.id,
            Ingredient.name,
            RI.quantity as quantity,
            RI.unit as unit
        FROM Cookbook_Recipe_Ingredient as RI
            LEFT JOIN Cookbook_Ingredient as Ingredient ON Ingredient.id = RI.ingredientId
        WHERE RI.recipeId = ?
        `,
        [params.id]
    );

    return { ...recipe, ingredients };
};
