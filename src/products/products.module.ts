import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schemas/products.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/users/schemas/users.schema';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService,AppGateway],
})
export class ProductsModule {}
