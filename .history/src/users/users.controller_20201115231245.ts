import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './config';

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
  UploadedFile,
  Req,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UsePipes(new ValidationPipe())
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  async createNewUser(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.create(createUserDto);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/renew')
  async renewToken(@Request() resp) {
    const response = this.userService.renewToken(resp.user);
    return response;
  }

  @Post('/sendEmail')
  async sendEmail(@Body() data) {
    const response = this.userService.sendEmail(data);
    return response;
  }

  @Post('/verifyPasswordPin')
  async validatePasswordPin(@Body() data) {
    const response = this.userService.validatePasswordPin(data);
    return response;
  }

  @Post('/resetPassword')
  async resetPwd(@Body() data) {
    const response = this.userService.resetPassword(data);
    return response;
  }

  @Post('/uploadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }
}
