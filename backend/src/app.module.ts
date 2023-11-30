// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// import { Module } from '@nestjs/common';
// // import { PrismaService } from './prisma.service';
// import { AppGateway } from './app.controller';

// @Module({
//   // providers: [PrismaService],
//   // exports: [PrismaService],
//   providers: [AppGateway],
//   controllers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { WebSocketGateway } from './websocket/websocket.gateway';
import { AppController } from './app.controller';

@Module({
  imports: [HelloModule],
  controllers: [AppController],
  providers: [WebSocketGateway],
})
export class AppModule {}
