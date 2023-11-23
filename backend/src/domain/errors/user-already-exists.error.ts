export class UserAlreadyExistsError extends Error {
    constructor(email: string) {
        super(`user ${email} already exists`);
    }
}
