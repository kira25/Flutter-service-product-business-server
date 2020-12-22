import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@WebSocketGateway(5001)
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
  @UseGuards(JwtAuthGuard)
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('msgToCleint', payload);
  }
}
