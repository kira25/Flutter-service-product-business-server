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
  Param,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as aws from 'aws-sdk';
import * as multers3 from 'multer-s3';
import { BUCKET_NAME, S3_ENDPOINT } from 'src/config/configuration';
import { imageFileFilter } from 'src/users/config';
import { ServicesService } from './service.service';
import { CreateServiceDTO, UpdateServiceDTO } from './dto/service.dto';
import { AppGateway } from 'src/app.gateway';
const spacesEndponit = new aws.Endpoint(S3_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndponit,
});

@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('service')
export class ServiceController {
  constructor(
    private serviceService: ServicesService,
    private gateway: AppGateway,
  ) {}

  @Get('/user')
  async getProductUser(@Request() req) {
    console.log('getServicesUser');
    const service = await this.serviceService.getProductUser(req.user);
    console.log(service);
    return service;
  }

  @Get('/id')
  async getServicesById( @Query('serviceId') serviceId: String){
    const service = await this.serviceService.getServicesById(serviceId);
    return service;

  }

  @Post('/create')
  async createService(
    @Body() createServiceDTO: CreateServiceDTO,
    @Request() req,
  ) {
    const service = await this.serviceService.createService(
      createServiceDTO,
      req.user,
    );
    console.log(service);
    return service;
  }

  @Put('/update') 
  async updateService(
    @Request() req,
    @Body() updateService: UpdateServiceDTO,
    @Query('serviceId') serviceId: any,
  ) {
    const serviceUpdated = await this.serviceService.updateService(
      updateService,
      serviceId,
      req.user,
    );
    return serviceUpdated;
  }

  @Put('/imageService')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageService1', maxCount: 1 },
        { name: 'imageService2', maxCount: 1 },
        { name: 'imageService3', maxCount: 1 },
        { name: 'imageService4', maxCount: 1 },
        { name: 'imageService5', maxCount: 1 },
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
  async deleteProduct(@Query('serviceId') serviceId, @Request() req) {
    console.log('delete');
    const serviceDeleted = await this.serviceService.deleteService(serviceId);
    const service = await this.serviceService.getProductUser(req.user);

    this.gateway.server.emit('getServices', service);
    return serviceDeleted;
  }
}
