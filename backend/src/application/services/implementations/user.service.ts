import { Inject, Injectable, Logger } from '@nestjs/common';
import UserServiceInterface from '@application/services/interfaces/user.service.interface';
import UserRepositoryInterface from '@application/repositories/interfaces/user.repository.interface';
import { UserEntity } from '@domain/entities/user.entity';

@Injectable()
export class UserService implements UserServiceInterface {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(user: UserEntity): Promise<number> {
    const id = await this.userRepository.createUser(user);
    this.logger.log(`user ${user.username} created with id ${id}`);
    return id;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.getUserByEmail(email);
  }
}
