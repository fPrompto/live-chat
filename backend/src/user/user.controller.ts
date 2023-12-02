import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserI } from '../interfaces/CreateUserI';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserI: CreateUserI) {
    console.log('create user controller', createUserI);
    return this.userService.createUser(createUserI);
  }

  @Post('login')
  async login(@Body() loginData: { emailUser: string; password: string }) {
    return this.userService.login(loginData);
  }

  @Post('verify/email')
  async verifyEmail(@Body() data: { email: string }) {
    return this.userService.verifyEmail(data.email);
  }

  @Post('verify/user')
  async verifyUser(@Body() data: { username: string }) {
    return this.userService.verifyUser(data.username);
  }
}
