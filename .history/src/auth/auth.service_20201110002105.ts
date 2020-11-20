import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      if (user.password === undefined) return {};
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const userDb = await this.userModel.findOne({
        email: loginUserDto.email,
      });
      if (!userDb) {
        return new HttpException(
          {
            status: 0,
            message: 'Email not found',
          },
          HttpStatus.NOT_FOUND,
        );
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
          HttpStatus.NOT_FOUND,
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
          status: 0,
          message: 'Talk to administrator',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // const payload = { username: user.username, sub: user.userId };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  private async ComparePassword(hashPassword: string, plainPassword: string) {
    const result = await bcrypt.compare(plainPassword, hashPassword);
    return result;
  }
}
