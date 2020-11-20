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
      signOptions: { expiresIn: '30m' },
    }),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService, ValidationPipe],

  controllers: [UsersController],
})
export class UsersModule {}
