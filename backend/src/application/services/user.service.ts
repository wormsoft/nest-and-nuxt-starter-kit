import {Injectable} from '@nestjs/common';
import {UserEntity} from "../../domain/entities/user.entity";
import * as winston from 'winston';

@Injectable()
export class UserService {
    constructor(private readonly logger: winston.Logger) {
    }

    async createUser(user: UserEntity): Promise<number> {
        this.logger.info(`creating a user ${JSON.stringify(user)}`, {
            email: user.email
        })
        return 10;
    }
}