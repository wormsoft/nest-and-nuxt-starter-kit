import {Inject, Injectable} from '@nestjs/common';
import UserRepositoryInterface from '../interfaces/user.repository.interface';
import {UserEntity} from '../../../domain/entities/user.entity';
import UserStorageInterface from '../../../infrastructure/storages/interfaces/user.storage.interface';
import {UserModel} from '../../../infrastructure/storages/models/user.model';

@Injectable()
class UserRepository implements UserRepositoryInterface {
    constructor(@Inject('UserStorageInterface') public readonly userStorage: UserStorageInterface) {
    }

    async createUser(user: UserEntity): Promise<number> {
        return this.userStorage.createUser(new UserModel(0, user.fullName, user.email, user.hashedPassword));
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userStorage.getUserByEmail(email);
        return Promise.resolve(new UserEntity(user.id, user.fullName, user.email, user.hashedPassword));
    }
}

export default UserRepository;
