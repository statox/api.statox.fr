// This is a prototype of my future custom error class
class CustomError extends Error {
    constructor(message?: string) {
        super(message ?? 'NO_ERROR_MESSAGE');
    }
}

export class DuplicateIngredientError extends CustomError {
    constructor(readonly ingredient: string) {
        super('INGREDIENT_INCLUDED_MORE_THAN_ONCE');
    }
}
