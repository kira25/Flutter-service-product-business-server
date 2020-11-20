import { JwtAuthGuard } from './auth/jwt-auth.guard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  Bind,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // @Bind(Request())
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
