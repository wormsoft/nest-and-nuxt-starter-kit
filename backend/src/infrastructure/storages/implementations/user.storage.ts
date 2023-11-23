import {Injectable} from '@nestjs/common';
import UserStorageInterface from '../interfaces/user.storage.interface';
import {UserModel} from '../models/user.model';
import {UserDoesNotExistsError} from "../../../domain/errors/user-does-not-exists.error";
import {UserAlreadyExistsError} from "../../../domain/errors/user-already-exists.error";

@Injectable()
class UserStorage implements UserStorageInterface {
    private readonly userByIdStorage: Map<number, UserModel>;
    private readonly idByEmailStorage: Map<string, number>;

    constructor() {
        this.userByIdStorage = new Map<number, UserModel>();
        this.idByEmailStorage = new Map<string, number>();
    }

    createUser(user: UserModel): Promise<number> {
        if (this.idByEmailStorage.has(user.email)) {
            throw new UserAlreadyExistsError(user.email);
        }

        const id = this.userByIdStorage.size + 1;
        user = new UserModel(id, user.fullName, user.email, user.hashedPassword);

        this.userByIdStorage.set(id, user);
        this.idByEmailStorage.set(user.email, id);
        return Promise.resolve(id);
    }

    getUserByEmail(email: string): Promise<UserModel> {
        const id = this.idByEmailStorage.get(email);
        if (!id) {
            throw new UserDoesNotExistsError(email);
        }

        const user = this.userByIdStorage.get(id);
        if (!user) {
            throw new UserDoesNotExistsError(email);
        }

        return Promise.resolve(user);
    }
}

export default UserStorage;