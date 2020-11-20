/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    return this.userModel
      .findOne({ email: email })
      .exec()
      .then(user => {
        return user;
      });
  }

  //CREATE USER
  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email: createUserDto.email });

      if (!user) {
        const salt = genSaltSync();
        createUserDto.password = hashSync(createUserDto.password, salt);
        const payload = { email: createUserDto.email };
        const token = this.jwtService.sign(payload);
        const createUser = new this.userModel(createUserDto);
        return createUser.save().then(
          async user => {
            return { ok: true, user, token };
          },
          err => {
            return { ok: false, response: err };
          },
        );
      } else {
        return { status: 1, response: 'Email already exist' };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: 0,
          message: 'Lost connection',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async renewToken(data: any) {
    try {
      const email = data.email;
      const token = this.jwtService.sign({ email });
      const userByEmail = await this.userModel.findOne({ email: email });

      return {
        ok: true,
        user: userByEmail,
        token,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
