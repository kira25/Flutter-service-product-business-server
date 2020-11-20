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
        return { status: 1, response: 'Email not found' };
      }
      const verifyPassword = bcrypt.compareSync(
        loginUserDto.password,
        userDb.password,
      );

      if (!verifyPassword) {
        return new HttpException(
          {
            error: 0,
            response: 'Bad password',
          },
          HttpStatus.BAD_REQUEST,
        );
        // return {
        //   status: 1,
        //   response: 'Bad password',
        // };
      }
      const token = await this.jwtService.sign(
        { email: loginUserDto.email },
        { expiresIn: '365d' },
      );

      return {
        ok: true,
        user: userDb,
        token,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 0,
        response: error,
      };
    }

    // const payload = { username: user.username, sub: user.userId };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }
}
