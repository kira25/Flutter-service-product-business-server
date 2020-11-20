import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Req,
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
  async renewToken(@Req() resp){
    const email = resp.email;
   
  }
}
