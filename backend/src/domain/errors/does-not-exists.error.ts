import { UserEntity } from '@domain/entities/user.entity';

export default class DoesNotExistsError extends Error {
  constructor(entity: string, message: string) {
    super(`${entity} does not exists: ${message}`);
  }
}

export class UserDoesNotExistsError extends DoesNotExistsError {
  constructor(field: string, value: string | number) {
    super(UserEntity.name, `with ${field} ${value}`);
  }
}
