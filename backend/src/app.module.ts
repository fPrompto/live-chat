import { Module } from '@nestjs/common';
import { WebSocketGateway } from './websocket/websocket.gateway';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';

import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.model';

@Module({
  imports: [HelloModule, UserModule],
  controllers: [AppController],
  providers: [WebSocketGateway, PrismaService],
})
export class AppModule {}
