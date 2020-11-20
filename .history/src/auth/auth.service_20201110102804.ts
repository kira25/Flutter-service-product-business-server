import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      if (user.password === undefined) return {};
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const userDb = await this.usersService.findOne(loginUserDto.email);
      if (!userDb) {
        return new BadRequestException();
      }
      const verifyPassword = bcrypt.compareSync(
        loginUserDto.password,
        userDb.password,
      );
      if (!verifyPassword) {
        return new HttpException(
          {
            status: 0,
            message: 'Password not valid',
          },
         
        );
      }
      const token = await this.jwtService.sign(loginUserDto.email);

      return {
        ok: true,
        user: userDb,
        token,
      };
    } catch (error) {
      return new HttpException(
        {
          message: error.data,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // const payload = { username: user.username, sub: user.userId };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }
}
