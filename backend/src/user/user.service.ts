import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserI } from '../interfaces/CreateUserI';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserI: CreateUserI) {
    console.log('create user service', createUserI);
    const hashedPassword = await hashPassword(createUserI.password);

    // Criando o usuário no banco de dados
    const createdUser = await this.prismaService.prisma.user.create({
      data: {
        email: createUserI.email,
        username: createUserI.username,
        displayname: createUserI.displayname,
        password: hashedPassword,
      },
    });

    // Não retorne a senha hashed na resposta
    const { password, ...userWithoutPassword } = createdUser;
    console.log('user without password', userWithoutPassword);
    console.log('password', password);
    return userWithoutPassword;
  }
}
