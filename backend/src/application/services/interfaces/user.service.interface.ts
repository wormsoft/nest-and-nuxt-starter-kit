import { UserEntity } from '@domain/entities/user.entity';

export default interface UserServiceInterface {
  createUser(user: UserEntity): Promise<number>;
  getUserByEmail(email: string): Promise<UserEntity>;
}
