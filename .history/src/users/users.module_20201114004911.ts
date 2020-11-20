import { UserSchema } from './schemas/users.schema';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from 'src/config/configuration';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { NodemailerOptions } from '@crowdlinker/nestjs-mailer';

@Module({
  imports: [
    NodemailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 342,
        auth: {
          user: 'erick.gutierrez@pucp.pe',
          pass: 'We789456123',
        },
      },
      defaults: {
        from: 'Hello @Crowdlinker <hello@crowdlinker.com>',
      },
    } as NodemailerOptions<NodemailerDrivers.SMTP>),
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '365d' },
    }),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
