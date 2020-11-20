import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';

@Controller()
export class AppController {

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req){
    return req.user;
  }

}
