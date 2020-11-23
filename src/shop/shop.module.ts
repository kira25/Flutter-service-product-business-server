import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/users.schema';
import { ShopSchema } from './schemas/shop.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'shop', schema: ShopSchema }]),
  ],
  providers: [ShopService, JwtModule],
  controllers: [ShopController],
})
export class ShopModule {}
