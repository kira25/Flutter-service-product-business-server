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
      const user = await this.userModel
        .findOne({ email: createUserDto.email })
        
      if (!user) {
        const salt = genSaltSync();
        createUserDto.password = hashSync(createUserDto.password, salt);
        const payload = { email: createUserDto.email };
        const token = this.jwtService.sign(payload, { expiresIn: '365d' });
        const createUser = new this.userModel(createUserDto);
        return createUser.save().then(
          async user => {
            return { ok: true, user, token };
          },
          err => {
            throw err;
          },
        );
      } else {
        return { errorCode: 1, message: 'Email already exist' };
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
}
