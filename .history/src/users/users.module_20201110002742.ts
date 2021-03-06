import { UserSchema } from './schemas/users.schema';
import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from 'src/config/configuration';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET,
      
    }),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService, ValidationPipe],
  exports: [],
  controllers: [UsersController],
})
export class UsersModule {}
