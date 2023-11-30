import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { WebSocketGateway } from '../websocket/websocket.gateway';

@Module({
  controllers: [HelloController],
  providers: [WebSocketGateway],
})
export class HelloModule {}
