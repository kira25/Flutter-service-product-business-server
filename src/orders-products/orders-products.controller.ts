import { UseGuards } from '@nestjs/common';
import { Post, Request, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderProductsDTO } from './dto/orders_products.dto';
import { OrdersProductsService } from './orders-products.service';

@Controller('orders-products')



export class OrdersProductsController {


    constructor( private orderProductService : OrdersProductsService ){}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createOrderProduct(
    @Request() req,
    @Body() createOrderProduct: CreateOrderProductsDTO,
  ) {

  }
}
