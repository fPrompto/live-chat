import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(4001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, payload: any): void {
    console.log('message', message);
    this.server.emit('message', message);
  }
}
