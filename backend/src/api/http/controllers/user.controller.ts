import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import UserServiceInterface from '@application/services/interfaces/user.service.interface';
import { CreateUserRequest } from '@api/http/schemas/create-user.request';
import { CreateUserResponse } from '@api/http/schemas/create-user.response';
import { UserEntity } from '@domain/entities/user.entity';
import { GetUserByEmailResponse } from '@api/http/schemas/get-user-by-email.response';
import { GetUserByEmailRequest } from '@api/http/schemas/get-user-by-email.request';
import { UserSchema } from '@api/http/schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  async createUser(
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const userId = await this.userService.createUser(
      plainToInstance(UserEntity, request),
    );
    return {
      userId,
    };
  }

  @Get('/:email')
  async getUserByEmail(
    @Param() request: GetUserByEmailRequest,
  ): Promise<GetUserByEmailResponse> {
    const user = await this.userService.getUserByEmail(request.email);
    return {
      user: plainToInstance(UserSchema, instanceToPlain(user)),
    };
  }
}
