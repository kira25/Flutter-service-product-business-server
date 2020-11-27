import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Put,
  Param,
  UseInterceptors,
  UploadedFiles,
  Get,
  Req,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../users/config';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  async getShopInfo(@Request() resp) {
    const shopInfo = this.shopService.getShopInfo(resp.user);
    return shopInfo;
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createShopInfo(@Body() shop, @Request() resp) {
    // console.log(files);
    const newShop = this.shopService.addShopInfo(shop, resp.user);
    return newShop;
  }

  @Put('/update')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profilePhoto', maxCount: 1 },
        { name: 'profileTitle', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './photo',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  @UseGuards(JwtAuthGuard)
  updateShopInfo(@Request() resp, @UploadedFiles() files) {
    console.log(files);
    console.log(files.profilePhoto[0].path);

    const newShop = this.shopService.addPhotoBankAccount(files, resp.user);
    return newShop;
  }
}
