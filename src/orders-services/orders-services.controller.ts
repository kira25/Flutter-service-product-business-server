import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
  Query,
} from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ROLE } from 'src/common/enum';
import { RolesGuard } from 'src/guards/guards.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UpdateOrderProductsDTO } from 'src/orders-products/dto/orders_products.dto';
import {
  CreateOrderServiceDTO,
  UpdateOrderServiceDTO,
} from './dto/orders_services.dto';
import { OrdersServicesService } from './orders-services.service';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('orders-services')
export class OrdersServicesController {
  constructor(
    private orderServicesService: OrdersServicesService,
    private gateway: AppGateway,
  ) {}

  @Roles(ROLE.USER)
  @Post('/create')
  async createOrderService(
    @Request() req,
    @Body() createOrderService: CreateOrderServiceDTO,
  ) {
    const order = await this.orderServicesService.createOrderServices(
      createOrderService,
      req.user,
    );
    this.gateway.server.emit('order-service', order.newOrderServices);
    console.log('create order services');

    return order;
  }

  @Get('/')
  async getUserOrderServices(@Request() req) {
    const order = await this.orderServicesService.getUserOrderServices(
      req.user,
    );
    return order;
  }

  @Put('/id')
  async updateOrderService(
    @Request() req,
    @Body() orderService: UpdateOrderServiceDTO,
    @Query('orderServiceId') orderServiceId,
  ) {
    const newOrderService = await this.orderServicesService.updateOrderService(
      orderService,
      orderServiceId,
    );

    return newOrderService;
  }
}
