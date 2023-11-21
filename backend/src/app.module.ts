import {Module, Scope} from '@nestjs/common';
import LoggerProvider from './infrastructure/logging/logging';
import {UserController} from './api/http/controllers/user.controller';
import UserStorage from './infrastructure/storages/implementations/user.storage';
import UserRepository from './application/repositories/implementations/user.repository';
import {UserService} from './application/services/user.service';

@Module({
    controllers: [UserController],
    providers: [
        {
            provide: 'UserStorageInterface',
            useClass: UserStorage,
            scope: Scope.DEFAULT,
        },
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
            scope: Scope.DEFAULT,
        },
        UserService,
        LoggerProvider,
    ],
})
export class AppModule {
}
