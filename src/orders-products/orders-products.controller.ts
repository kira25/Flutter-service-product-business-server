import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Post, Request, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ROLE } from 'src/common/enum';
import { RolesGuard } from 'src/guards/guards.guard';
import { Roles } from 'src/guards/roles.decorator';
import { CreateOrderProductsDTO } from './dto/orders_products.dto';
import { OrdersProductsService } from './orders-products.service';

@UsePipes(new ValidationPipe())
@UseGuards(RolesGuard)
@Controller('orders-products')
export class OrdersProductsController {
  constructor(
    private orderProductService: OrdersProductsService,
    private gateway: AppGateway,
  ) {}

  @Roles(ROLE.USER)
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createOrderProduct(
    @Request() req,
    @Body() createOrderProduct: CreateOrderProductsDTO,
  ) {
    //ELEGIR EL PRODUCTO A ORDENAR

    //CREAR LA ORDEN
    const orderProduct = await this.orderProductService.createOrderProduct(
      createOrderProduct,
      req.user,
    );
    //EMITIR EL MENSAJE HACIA LA TIENDA RESPECTIVA
    this.gateway.server.emit('order-product', orderProduct.newOrderProduct);
    console.log('create order product');
    return orderProduct;
  }
}
