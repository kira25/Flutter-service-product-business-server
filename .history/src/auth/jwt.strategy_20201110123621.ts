/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SECRET } from 'src/config/configuration';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //Expired tokens will get 401 Unathorized
      secretOrKey: SECRET,
    });
  }

  async validate(payload: any) {
    try {
      return { email: payload.email };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          error: 'Invalid Token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
