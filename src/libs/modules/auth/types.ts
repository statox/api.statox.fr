export interface User {
    id: number;
    username: string;
}

export type UserWithAuth = User & {
    hashedPassword: Buffer;
    salt: Buffer;
};
