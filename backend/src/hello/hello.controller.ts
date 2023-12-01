import { Controller, Get } from '@nestjs/common';
import { WebSocketGateway } from '../websocket/websocket.gateway';

@Controller('hello')
export class HelloController {
  constructor(private readonly websocketGateway: WebSocketGateway) {}

  @Get()
  getHello(): string {
    this.websocketGateway.sendMessageToClients('Hello from WebSocket!');
    return 'Hello World!';
  }
}
