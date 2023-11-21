export class UserModel {
    constructor(public readonly id: number,
                public readonly fullName: string,
                public readonly email: string,
                public readonly hashedPassword: string) {
    }
}