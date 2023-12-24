import * as path from 'path';
import { Logger, Module, Scope } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import getConfig from '@common/config/config';
import { UserController } from '@api/http/controllers/user.controller';
import { UserService } from '@application/services/implementations/user.service';
import { UserSchema } from '@application/repositories/schemas/user.schema';
import { UserRepository } from '@application/repositories/implementations/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [getConfig],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
      serveRoot: '/',
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          entities: [UserSchema],
          synchronize: true,
          type: 'postgres',
          database: config.get('db.name'),
          username: config.get('db.user'),
          password: config.get('db.password'),
          host: config.get('db.host'),
          port: config.get<number>('db.port'),
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'UserServiceInterface',
      useClass: UserService,
      scope: Scope.DEFAULT,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
      scope: Scope.DEFAULT,
    },
    Logger,
  ],
  controllers: [UserController],
})
export class AppModule {}
