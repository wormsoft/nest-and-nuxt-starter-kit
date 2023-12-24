import { EntitySchema } from 'typeorm';
import { UserEntity } from '@domain/entities/user.entity';

export const UserSchema = new EntitySchema<UserEntity>({
  name: 'UserEntity',
  target: UserEntity,
  tableName: 'user',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
    username: {
      type: String,
      nullable: false,
      unique: true,
    },
    hashedPassword: {
      name: 'hashed_password',
      type: String,
      nullable: false,
    },
    fullName: {
      name: 'full_name',
      type: String,
      nullable: false,
    },
    isActive: {
      name: 'is_active',
      type: String,
      nullable: false,
      default: true,
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp with time zone',
      nullable: false,
      default: (): string => 'now()',
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp with time zone',
      nullable: false,
      default: (): string => 'now()',
    },
  },
});
