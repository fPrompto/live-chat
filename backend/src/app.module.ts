import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { PrismaService } from './prisma.service';
import { AppService } from './app.service';

import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.model';

import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [HelloModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ChatGateway],
})
export class AppModule {}
