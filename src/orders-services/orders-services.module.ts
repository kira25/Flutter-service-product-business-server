import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from 'src/app.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { serviceSchema } from 'src/service/schema/service.schema';
import { ServicesService } from 'src/service/service.service';
import { UserSchema } from 'src/users/schemas/users.schema';
import { OrdersServicesController } from './orders-services.controller';
import { OrdersServicesService } from './orders-services.service';
import { ordersServiceSchema } from './schemas/orders_services';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Service', schema: serviceSchema }]),
    MongooseModule.forFeature([
      { name: 'OrderServices', schema: ordersServiceSchema },
    ]),
  ],
  controllers: [OrdersServicesController],
  providers: [OrdersServicesService,AppGateway, ServicesService]
})
export class OrdersServicesModule {}
