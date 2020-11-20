import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  users: { userId: number; username: string; password: string }[];
  constructor(@InjectModel('User') private userModel: Model<User>) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username) {
    return this.users.find(user => user.username === username);
  }

  //CREATE USER
  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
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
