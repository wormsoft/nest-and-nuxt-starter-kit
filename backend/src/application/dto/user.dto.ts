export class CreateUserDto {
    constructor(public readonly fullName: string,
                public readonly email: string,
                public readonly hashedPassword: string) {
    }
}
