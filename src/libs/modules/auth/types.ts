export interface User {
    id: number;
    username: string;
    scopes: string[];
}

export type UserWithAuth = User & {
    hashedPassword: Buffer;
    salt: Buffer;
};
