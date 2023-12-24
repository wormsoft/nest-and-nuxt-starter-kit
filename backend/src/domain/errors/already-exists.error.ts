import { UserEntity } from '@domain/entities/user.entity';

export default class AlreadyExistsError extends Error {
  constructor(entity: string, message: string) {
    super(`${entity} already exists: ${message}`);
  }
}

export class UserAlreadyExistsError extends AlreadyExistsError {
  constructor(detail: string) {
    super(UserEntity.name, detail);
  }
}
