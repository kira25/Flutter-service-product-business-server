import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from 'src/app.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsService } from 'src/products/products.service';
import { productSchema } from 'src/products/schemas/products.schema';
import { UserSchema } from 'src/users/schemas/users.schema';
import { OrdersProductsController } from './orders-products.controller';
import { OrdersProductsService } from './orders-products.service';
import { ordersProductsSchema } from './schemas/orders_products';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
    MongooseModule.forFeature([
      { name: 'OrderProduct', schema: ordersProductsSchema },
    ]),
  ],
  controllers: [OrdersProductsController],
  providers: [OrdersProductsService, AppGateway, ProductsService],
})
export class OrdersProductsModule {}
