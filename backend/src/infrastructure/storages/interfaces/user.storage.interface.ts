import {UserModel} from '../models/user.model';

interface UserStorageInterface {
    createUser(user: UserModel): Promise<number>;

    getUserByEmail(email: string): Promise<UserModel>;
}

export default UserStorageInterface;
