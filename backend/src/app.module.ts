import {Module} from '@nestjs/common';
import LoggerProvider from './infrastructure/logging/logging';
import {UserController} from "./api/http/controllers/user.controller";
import {UserService} from "./application/services/user.service";

@Module({
    controllers: [UserController],
    providers: [LoggerProvider, UserService],
})
export class AppModule {
}
