/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as aws from 'aws-sdk';
import * as multers3 from 'multer-s3';
import { S3_ENDPOINT, BUCKET_NAME } from '../config/configuration';
import { imageFileFilter } from '../users/config';

const spacesEndponit = new aws.Endpoint(S3_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndponit,
});

@UsePipes(new ValidationPipe())
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createPost(@Request() req, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(
      createProductDTO,
      req.user,
    );
    console.log(createProductDTO);
    return product;
  }

  @Put('/imageProduct/:productId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageProduct1', maxCount: 1 },
        { name: 'imageProduct2', maxCount: 1 },
        { name: 'imageProduct3', maxCount: 1 },
        { name: 'imageProduct4', maxCount: 1 },
        { name: 'imageProduct5', maxCount: 1 },
      ],
      {
        storage: multers3({
          s3,
          bucket: `${BUCKET_NAME}/Products`,
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
    @Param('productId') productId: any,
  ) {
   
    const productImage = this.productService.addImageProducts(
      files,
      resp.user,
      productId,
    );
    return productImage;
  }

  @Get('/')
  async getProducts() {
    console.log('getProducts');
    const products = await this.productService.getProducts();
    return products;
  }

  //GET PRODUCTS BY USER
  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getProductUser(@Request() req) {
    console.log('getProductsUser');
    const productUser = await this.productService.getProductUser(req.user);
    return productUser;
  }

  // @Get(':productId')
  // async getProduct(@Param('productId') productID: string, @Res() res) {
  //   console.log('getProduct');

  //   const products = await this.productService.getProduct(productID);
  //   if (!products) throw new NotFoundException('Product does not exist');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Product created',
  //     products,
  //   });
  // }

  @Put('/update/:productId')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Body() createdProduct: UpdateProductDTO,
    @Param('productId') productId: any,
  ) {
    const productUpdated = await this.productService.updateProduct(
      createdProduct,
      productId,
    );
    return productUpdated;
  }

  @Delete('/delete')
  async deleteProduct(@Query('productID') productId) {
    console.log('delete');
    const productDeleted = await this.productService.deleteProduct(productId);
    return productDeleted;
  }
}
