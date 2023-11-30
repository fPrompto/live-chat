// import {
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';

// @WebSocketGateway(3001) // Porta para WebSocket
// export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server;

//   handleConnection(client) {
//     console.log(`Cliente conectado: ${client.id}`);
//   }

//   handleDisconnect(client) {
//     console.log(`Cliente desconectado: ${client.id}`);
//   }
// }

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
