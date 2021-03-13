import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UseGuards, Request } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';
import { SECRET } from './config/configuration';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/users.interface';

@WebSocketGateway(5001)
export class AppGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(@InjectModel('User') private userModel: Model<User>) {}
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('Init');
  }
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  getUser = async (client: Socket) => {
    const id = jwt.verify(client.handshake.headers['x-token'], SECRET);

    const user = await this.userModel.findOne({ email: id['email'] });
    return user._id;
  };

  async handleConnection(client: Socket, @Request() req) {
    this.logger.log(`Client connected: ${client.id}`);
    const user = await this.getUser(client);

    client.join(user, () => {
      console.log('user has join too room with ' + user.toString());
      
    });
  }

  @SubscribeMessage('order-product')
  handleMessage(client: Socket, payload: any): void {
    return payload;
  }
}
