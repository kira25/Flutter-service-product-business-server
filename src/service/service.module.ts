import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from 'src/app.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/users/schemas/users.schema';
import { serviceSchema } from './schema/service.schema';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService,AppGateway],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Service', schema: serviceSchema }]),
  ],
})
export class ServiceModule {}
