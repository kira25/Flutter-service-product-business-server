import { UserSchema } from './schemas/users.schema';
import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtService,MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService, ValidationPipe],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
