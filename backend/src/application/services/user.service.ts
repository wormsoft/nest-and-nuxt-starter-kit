import {Inject, Injectable} from '@nestjs/common';
import * as winston from 'winston';
import {UserEntity} from '../../domain/entities/user.entity';
import UserRepositoryInterface from '../repositories/interfaces/user.repository.interface';

@Injectable()
export class UserService {
    constructor(@Inject('UserRepositoryInterface') private readonly userRepository: UserRepositoryInterface,
                private readonly logger: winston.Logger) {
    }

    async createUser(user: UserEntity): Promise<number> {
        this.logger.info(`creating a user ${JSON.stringify(user)}`, {
            email: user.email
        })
        return this.userRepository.createUser(user);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.getUserByEmail(email);
    }
}