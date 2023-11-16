export class UserEntity {
    public readonly fullName: string;
    public readonly email: string;
    public readonly hashedPassword: string;

    constructor(fullName: string, email: string, hashedPassword: string) {
        if (fullName.length === 0) {
            // TODO: use domain error
            throw new Error('full name can\'t be empty');
        }

        if (email.length === 0) {
            // TODO: validate format
            throw new Error('full name can\'t be empty');
        }

        // Check other business logic restrictions. For example, the number of user roles is always greater than 1.
        // This check cannot be performed at the controller level. This restriction can also be checked at the
        // service level.

        this.fullName = fullName;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }
}