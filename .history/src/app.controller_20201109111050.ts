import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';

@Controller()
export class AppController {

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return req.user;
  }

}
