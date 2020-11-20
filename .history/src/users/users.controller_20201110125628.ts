/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UsePipes(new ValidationPipe())
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  async createNewUser(@Body() createUserDto: CreateUserDto) {
    console.log('Create User');
    const response = await this.userService.create(createUserDto);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/renew')
  async renewToken(@Request() resp) {
    console.log();
    const response = this.userService.renewToken(resp.user);
    return response;
  }
}
