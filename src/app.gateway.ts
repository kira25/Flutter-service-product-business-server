import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('Init');
  }
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('msgToCleint', payload);
  }
}
