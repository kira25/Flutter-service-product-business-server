/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Nodemailer, NodemailerDrivers } from '@crowdlinker/nestjs-mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly nodemailer: Nodemailer<NodemailerDrivers.SMTP>,
  ) {}

  //FIND ONE
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
        const payload = {
          email: createUserDto.email,
          role: createUserDto.role,
        };
        const token = this.jwtService.sign(payload);

        const createUser = new this.userModel(createUserDto);
        createUser.resetPingUsed = false;
        createUser.resetPwdPing = '';

        return createUser.save().then(
          async user => {
            console.log(user);
            return { ok: true, user, token };
          },
          err => {
            return { ok: false, response: err };
          },
        );
      } else {
        return { ok: false, response: 'Email already exist' };
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
  //RENEW TOKEN
  async renewToken(data: any) {
    try {
      const email = data.email;
      console.log(email);
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

  //SendEmail
  async sendEmail(data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const code = Math.floor(Math.random() * 899999 + 100000);
    const userUpdated = await this.userModel.findOneAndUpdate(
      {
        _id: user._id,
      },
      { resetPwdPing: code.toString(), resetPingUsed: false },
    );
    

    let html = '';
    let subject = '';
    subject = this.getSubject();
    html = this.htmlPassword(user.email, user.firstname, 'codigo');

    this.nodemailer.sendMail({
      to: email,
      subject: subject,
      text: 'Kira',
      html: html,
    });
  }

  getSubject() {
    const SUBJECT = 'Forgot your password? Review this code';
    return SUBJECT;
  }

  htmlPassword(email, name, codigo) {
    return ``;
  }
}
