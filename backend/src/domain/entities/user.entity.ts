import {ArgumentError} from "../errors/argument.error";

export class UserEntity {
    public readonly id: number;
    public readonly fullName: string;
    public readonly email: string;
    public readonly hashedPassword: string;

    constructor(id: number, fullName: string, email: string, hashedPassword: string) {
        if (fullName.length === 0) {
            throw new ArgumentError('full name can\'t be empty');
        }

        if (email.length === 0) {
            throw new ArgumentError('email can\'t be empty');
        }

        // Check other business logic restrictions. For example, the number of user roles is always greater than 1.
        // This check cannot be performed at the controller level. This restriction can also be checked at the
        // service level.

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }
}
