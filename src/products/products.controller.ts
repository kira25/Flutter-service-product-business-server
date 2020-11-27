/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CreateProductDTO } from './dto/product.dto';
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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @Get('/')
  async getProducts(@Res() res) {
    console.log('getProducts');
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Product getted',
      products,
    });
  }

  //GET PRODUCTS BY USER
  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getProductUser(@Request() req) {
    console.log('getProductsUser');
    const productUser = await this.productService.getProductUser(req.user);
    return productUser;
  }

  @Get(':productId')
  async getProduct(@Param('productId') productID: string, @Res() res) {
    console.log('getProduct');

    const products = await this.productService.getProduct(productID);
    if (!products) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product created',
      products,
    });
  }

  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() createdProduct: CreateProductDTO,
    @Query('productID') productId,
  ) {
    const productUpdated = await this.productService.updateProduct(
      createdProduct,
      productId,
    );
    if (!productUpdated) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Updated',
      productUpdated,
    });
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productId) {
    const productDeleted = await this.productService.deleteProduct(productId);
    if (!productDeleted) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Deleted',
      productDeleted,
    });
  }
}
