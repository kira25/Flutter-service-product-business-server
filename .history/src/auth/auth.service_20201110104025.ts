import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(email);
    // if (user) {
    //   if (user.password === undefined) return {};
    // }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const email = loginUserDto.email;
      const userDb = await this.userModel.findOne({ email: email });
      if (!userDb) {
        throw new HttpException(
          {
            status: 0,
            error: 'Email not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const verifyPassword = bcrypt.compareSync(
        loginUserDto.password,
        userDb.password,
      );
      console.log(verifyPassword);
      if (verifyPassword == false) {
        throw new HttpException(
          {
            status: 0,
            error: 'Password not valid',
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
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Talk to admin',
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
