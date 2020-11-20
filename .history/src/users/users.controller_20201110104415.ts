import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async createNewUser(@Body() createUserDto: CreateUserDto) {
    console.log('Create User');
    const response = await this.userService.create(createUserDto);
    return response;
  }
}
