import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from '../../../application/services/user.service';
import {UserEntity} from '../../../domain/entities/user.entity';
import {CreateUserResponse} from '../schemas/create-user.response';
import {CreateUserRequest} from '../schemas/create-user.request';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async createUser(@Body() request: CreateUserRequest): Promise<CreateUserResponse> {
        // TODO: catch domain error and process it
        const user = new UserEntity(0, request.fullName, request.email, request.hashedPassword);
        const id = await this.userService.createUser(user);
        return new CreateUserResponse(id);
    }
}
