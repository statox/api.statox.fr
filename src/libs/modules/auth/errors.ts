/**
 * User was likely logged out
 */
export class Auth_UnauthorizedError extends Error {
    constructor() {
        super('UNAUTHORIZED');
    }
}

/**
 * User doesn't have the right to access the resource
 */
export class Auth_ForbiddenForUserError extends Error {
    constructor() {
        super('FORBIDDEN_FOR_USER');
    }
}

/**
 * There is a scope configuration issue
 */
export class Auth_InvalidScopeError extends Error {
    constructor() {
        super('INVALID_SCOPE');
    }
}
