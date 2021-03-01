import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/interfaces/product.interface';
import { User } from 'src/users/interfaces/users.interface';
import { CreateOrderProductsDTO } from './dto/orders_products.dto';
import { OrdersProducts } from './interfaces/orders_products.interface';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('OrderProduct')
    private orderProductModel: Model<OrdersProducts>,
  ) {}

  async createOrderProduct(
    createOrderProduct: CreateOrderProductsDTO,
    data: any,
  ) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const product = await this.productModel.findOne({
      name: createOrderProduct.sellerId,
    });
    if (!product) return { ok: false, response: 'Product not exist' };

    const orderProduct = await this.orderProductModel.findOne({
      orderId: createOrderProduct.orderId,
    });
    if (orderProduct)
      return { ok: false, response: 'OrderProduct already exist' };
    createOrderProduct.clientId = user.id;
    createOrderProduct.clientName = `${user.firstname} ${user.lastname}`;
    createOrderProduct.clientCellphone = user.cellphone;
    const newOrderProduct = new this.orderProductModel(createOrderProduct);
    await newOrderProduct.save();
    return { ok: true, newOrderProduct };
  }
}
