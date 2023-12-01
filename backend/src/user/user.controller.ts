import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserI } from '../interfaces/CreateUserI';

@Controller('user/create')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserI: CreateUserI) {
    console.log('create user controller', createUserI);
    return this.userService.createUser(createUserI);
  }
}
