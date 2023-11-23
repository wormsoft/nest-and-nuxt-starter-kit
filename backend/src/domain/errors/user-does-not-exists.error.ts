export class UserDoesNotExistsError extends Error {
    constructor(email: string) {
        super(`user ${email} does not exists`);
    }
}
