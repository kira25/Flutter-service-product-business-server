import {
  Controller,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Request,
  UploadedFiles,
  Get,
  Delete,
  Body,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as aws from 'aws-sdk';
import * as multers3 from 'multer-s3';
import { BUCKET_NAME, S3_ENDPOINT } from 'src/config/configuration';
import { imageFileFilter } from 'src/users/config';
import { ServiceService } from './service.service';
import { CreateServiceDTO } from './dto/service.dto';
const spacesEndponit = new aws.Endpoint(S3_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndponit,
});

@UsePipes(new ValidationPipe())
@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getProductUser(@Request() req) {
    console.log('getProductsUser');
    const service = await this.serviceService.getProductUser(req.user);
    return service;
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createService(
    @Body() createServiceDTO: CreateServiceDTO,
    @Request() req,
  ) {
    const service = await this.serviceService.createService(
      createServiceDTO,
      req.user,
    );
    return service;
  }

  @Put('/imageService')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageService1', maxCount: 1 },
        { name: 'imageService2', maxCount: 1 },
        { name: 'imageService3', maxCount: 1 },
        { name: 'imageService4', maxCount: 1 },
        { name: 'imageServicet5', maxCount: 1 },
      ],
      {
        storage: multers3({
          s3,
          bucket: `${BUCKET_NAME}/Services`,
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
  async addImageProduct(
    @Request() resp,
    @UploadedFiles() files,
    @Query('serviceId') serviceId: any,
  ) {
    const serviceImages = await this.serviceService.addImageServices(
      files,
      resp.user,
      serviceId,
    );
    return serviceImages;
  }

  @Delete('/delete')
  async deleteProduct(@Query('serviceId') serviceId) {
    console.log('delete');
    const serviceDeleted = await this.serviceService.deleteService(serviceId);
    return serviceDeleted;
  }
}
