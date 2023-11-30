import {
  WebSocketGateway as NestWSG,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@NestWSG(3001)
export class WebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;

  handleConnection(client) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendMessageToClients(message: string) {
    this.server.emit('messageToClients', { message });
  }
}
