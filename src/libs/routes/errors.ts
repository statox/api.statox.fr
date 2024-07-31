export class FileOrContentRequiredError extends Error {
    constructor() {
        super('FILE_OR_CONTENT_REQUIRED');
    }
}

export class ItemAlreadyExistsError extends Error {
    constructor() {
        super('ITEM_ALREADY_EXISTS');
    }
}

export class ItemNotFoundError extends Error {
    constructor() {
        super('ITEM_NOT_FOUND');
    }
}
