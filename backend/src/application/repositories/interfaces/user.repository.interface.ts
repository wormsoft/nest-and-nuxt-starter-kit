import {UserEntity} from '../../../domain/entities/user.entity';

interface UserRepositoryInterface {
    createUser(user: UserEntity): Promise<number>;

    getUserByEmail(email: string): Promise<UserEntity>;
}

export default UserRepositoryInterface;
