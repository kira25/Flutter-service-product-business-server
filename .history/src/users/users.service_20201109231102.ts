import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

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
    const user = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (!user) {
      const createUser = new this.userModel(createUserDto);
      return createUser.save().then(
        async user => {
          return { user };
        },
        err => {
          throw err;
        },
      );
    } else {
      return { error: 1, message: 'Email already exist' };
    }
  }
}
