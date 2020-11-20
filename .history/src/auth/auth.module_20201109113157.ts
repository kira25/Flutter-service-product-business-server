import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './loca.strategy';
import { SECRET } from 'src/config/configuration';

@Module({
  imports: [UsersModule, PassportModule,JwtModule.register({
    secret : SECRET,
    signOptions :{expiresIn: '30m'}
  })],
  providers: [AuthService, LocalStrategy],
  exports : [AuthService]
})
export class AuthModule {}
