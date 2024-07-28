export class ItemAlreadyExistsError extends Error {
    constructor() {
        super('ITEM_ALREADY_EXISTS');
    }
}
