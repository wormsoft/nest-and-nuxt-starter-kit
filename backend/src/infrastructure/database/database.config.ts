import { IsNotEmpty, IsString } from 'class-validator';
import { BaseConfig } from '@common/config/baseConfig';

export class DatabaseConfig extends BaseConfig {
  @IsNotEmpty()
  @IsString()
  readonly url: string = process.env.DATABASE_URL;
}
