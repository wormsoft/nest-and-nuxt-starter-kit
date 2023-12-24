import { UserEntity } from '@domain/entities/user.entity';

export default interface UserRepositoryInterface {
  createUser(user: UserEntity): Promise<number>;
  getUserByEmail(email: string): Promise<UserEntity>;
}
