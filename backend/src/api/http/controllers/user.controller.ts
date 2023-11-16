import {Controller, Post, Body} from '@nestjs/common';
import {CreateUserDto} from "../../../application/dto/user.dto";
import {UserService} from "../../../application/services/user.service";
import {UserEntity} from "../../../domain/entities/user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        // TODO: catch domain error and process it
        const user = new UserEntity(createUserDto.fullName, createUserDto.email, createUserDto.hashedPassword);
        return {
            userId: await this.userService.createUser(user),
        };
    }
}
