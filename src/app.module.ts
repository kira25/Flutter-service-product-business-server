import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { DATABASE, DATABASE_TEST } from './config/configuration';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { ServiceModule } from './service/service.module';
import { OrdersProductsModule } from './orders-products/orders-products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersServicesModule } from './orders-services/orders-services.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TasksModule,
    MongooseModule.forRoot(DATABASE_TEST),
    ProductsModule,
    UsersModule,
    AuthModule,
    ShopModule,
    ServiceModule,
    OrdersProductsModule,
    OrdersServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Los modulos son codigo inicial, cada modulo comprende una parte de la aplicacion total
