import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@infrastructure/database/database.config';
import { databaseConfig } from '@infrastructure/config/database';

export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [
            {
              module: class DatabaseConfigModule {},
              providers: [DatabaseConfig],
              exports: [DatabaseConfig],
            },
          ],
          inject: [DatabaseConfig],
          useFactory: (config: DatabaseConfig) =>
            databaseConfig(config).database,
        }),
      ],
      providers: [],
    };
  }
}
