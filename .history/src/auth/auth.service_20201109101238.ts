/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import moment = require('moment');


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){

    }

    async validateUser(email: string, pass: string): Promise<any> {
        console.log(email);
        const user = await this.usersService.findOne(email);
        if (user) {
          if (user.password === undefined)
            return {
              response: { success: false, message: 'incorrect user or password' },
            };
          if (await this.passwordsAreEqual(user.password, pass)) {
            const { password, ...result } = user;
            if (user.blocked)
              return { response: { success: false, message: 'Worker Blocked' } };
            return { success: true, data: user };
          } else {
            return {
              response: { success: false, message: 'incorrect user or password' },
            };
          }
        } else
          return {
            response: { success: false, message: 'incorrect user or password' },
          };
      }

      async login(user: any) {
        console.log(user);
        const payload = {
          email: user.data.email,
          sub: user.data._id,
          role: user.data.role,
        };
        return {
          accessToken: this.jwtService.sign(payload, { expiresIn: '365d' }),
          refreshToken: this.jwtService.sign(payload, { expiresIn: '365d' }),
          expiresIn: moment(Date.now())
            .add(365, 'days')
            .toDate()
            .getTime(),
          response: user,
        };
      }

      async refresh(data: any) {
        if (data.refresh_token !== undefined) {
          return await this.jwtService
            .verifyAsync(data.refresh_token)
            .then(value => {
              return {
                error: 0,
                accessToken: this.jwtService.sign(
                  { email: value.email, sub: value.sub },
                  { expiresIn: '365d' },
                ),
                refreshToken: this.jwtService.sign(
                  { email: value.email, sub: value.sub },
                  { expiresIn: '365d' },
                ),
              };
            })
            .catch(err => ({ error: 1, message: 'Unauthorized access.' }));
        } else return { error: 1, message: 'Unauthorized access.' };
      }


      private async passwordsAreEqual(
        hashedPassword: string,
        plainPassword: string,
      ): Promise<boolean> {
        const result = await bcrypt.compare(plainPassword, hashedPassword);
        return result;
      }
    

}