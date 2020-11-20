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
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    console.log(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'recieved',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Product created',
      products,
    });
  }
  @Get('/:productId/get')
  async getProduct(@Param('productId') productID, @Res() res) {
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
