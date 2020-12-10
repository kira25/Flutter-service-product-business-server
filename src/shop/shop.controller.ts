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
import * as aws from 'aws-sdk';
import * as multers3 from 'multer-s3';
import { S3_ENDPOINT, BUCKET_NAME } from '../config/configuration';

const spacesEndponit = new aws.Endpoint(S3_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndponit,
});

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
        storage: multers3({
          s3,
          bucket: `${BUCKET_NAME}/Shop`,
          acl: 'public-read',
          metadata: (req, file, cb) => {
            cb(null, {
              fieldname: file.fieldname,
            });
          },
          key: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname);
          },
        }),
        // storage: diskStorage({
        //   destination: './photo',
        //   filename: editFileName,
        // }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  @UseGuards(JwtAuthGuard)
  updateShopInfo(@Request() resp, @UploadedFiles() files) {
    console.log(files.profilePhoto[0].location);
    console.log(files.profileTitle[0].location);

    const newShop = this.shopService.addPhotoBankAccount(files, resp.user);
    return newShop;
  }
}
