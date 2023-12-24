import { Injectable, Logger } from '@nestjs/common';
import UserRepositoryInterface from '@application/repositories/interfaces/user.repository.interface';
import { UserEntity } from '@domain/entities/user.entity';
import { EntityManager, EntityNotFoundError, QueryFailedError } from 'typeorm';
import { UserSchema } from '@application/repositories/schemas/user.schema';
import { UserDoesNotExistsError } from '@domain/errors/does-not-exists.error';
import { UserAlreadyExistsError } from '@domain/errors/already-exists.error';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly manager: EntityManager) {}

  async createUser(user: UserEntity): Promise<number> {
    try {
      user = await this.manager.save(UserSchema, user);
      return user.id;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        // unique constraint
        if (err.driverError.code === '23505') {
          throw new UserAlreadyExistsError(err.message);
        }
      }
      throw err;
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.manager.findOneByOrFail(UserSchema, {
        email,
      });
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new UserDoesNotExistsError('email', email);
      }
      throw err;
    }
  }
}
