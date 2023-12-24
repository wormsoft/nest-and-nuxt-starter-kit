import { Exclude } from 'class-transformer';

export class UserEntity {
  public readonly id: number;

  public readonly email: string;

  public readonly username: string;

  @Exclude({ toPlainOnly: true })
  public readonly hashedPassword: string;

  public readonly fullName: string;

  public readonly isActive: boolean;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;
}
