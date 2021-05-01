import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateOrderProductsDTO } from 'src/orders-products/dto/orders_products.dto';
import { Service } from 'src/service/interface/service.interface';
import { ServicesService } from 'src/service/service.service';
import { User } from 'src/users/interfaces/users.interface';
import {
  CreateOrderServiceDTO,
  UpdateOrderServiceDTO,
} from './dto/orders_services.dto';
import { OrdersServices } from './interfaces/orders_services.interface';

@Injectable()
export class OrdersServicesService {
  constructor(
    @InjectModel('Service') private readonly serviceModel: Model<Service>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('OrderServices')
    private orderServiceModel: Model<OrdersServices>,
    private servicesService: ServicesService,
  ) {}

  async createOrderServices(
    createOrderServices: CreateOrderServiceDTO,
    data: any,
  ) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });

    if (!user) return { ok: false, response: 'No user found' };
    const service = await this.serviceModel.findOne({
      userId: createOrderServices.sellerId,
    });
    if (!service)
      return { ok: false, response: 'Vendor do not have this service' };
    createOrderServices.clientId = user.id;
    createOrderServices.clientName = `${user.firstname} ${user.lastname}`;
    createOrderServices.clientCellphone = user.cellphone;
    const newOrderServices = new this.orderServiceModel(createOrderServices);
    await newOrderServices.save();

    return { ok: true, newOrderServices };
  }

  async getUserOrderServices(data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const orderServices = await this.orderServiceModel.find({
      sellerId: user._id,
    });
    if (orderServices.length == 0)
      return { ok: false, response: 'No Order Service' };
    return { ok: true, orderServices };
  }

  async updateOrderService(orderService: UpdateOrderServiceDTO, id: String) {
    const order = await this.orderServiceModel.findById(id);
    if (!order) return { ok: false, response: 'No Order Service' };

    const newOrderService = await this.orderServiceModel.findByIdAndUpdate(
      id,
      {
        orderState: orderService.orderState,
      },
      { new: true, useFindAndModify: false },
    );
    return { ok: true, newOrderService };
  }
}
