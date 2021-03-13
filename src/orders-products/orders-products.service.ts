import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/interfaces/product.interface';
import { User } from 'src/users/interfaces/users.interface';
import { CreateOrderProductsDTO } from './dto/orders_products.dto';
import { OrdersProducts } from './interfaces/orders_products.interface';
import * as uuid from 'uuid';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('OrderProduct')
    private orderProductModel: Model<OrdersProducts>,
    private productService: ProductsService,
  ) {}

  async createOrderProduct(
    createOrderProduct: CreateOrderProductsDTO,
    data: any,
  ) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    //VERIFICAR QUE EL COMPRADOR EXISTA
    if (!user) return { ok: false, response: 'No user found' };
    //VERIFICAR QUE EL VENDEDOR TENGA PRODUCTOS ASIGNADOS A EL
    const product = await this.productModel.findOne({
      userId: createOrderProduct.sellerId,
    });
    if (!product) return { ok: false, response: 'Vendor have no products' };
    createOrderProduct.orderId = uuid.v4();
    const orderProduct = await this.orderProductModel.findOne({
      orderId: createOrderProduct.orderId,
    });
    if (orderProduct)
      return { ok: false, response: 'OrderProduct already exist' };
    createOrderProduct.clientId = user.id;
    createOrderProduct.clientName = `${user.firstname} ${user.lastname}`;

    createOrderProduct.clientCellphone = user.cellphone;

    let totalproduct = 0;
    totalproduct = createOrderProduct.selectedProducts.reduce(
      (acc, curr) => acc + (curr.amount == null ? 0 : curr.amount),
      0,
    );
    createOrderProduct.amountProducts = totalproduct;
    let totalprice = 0;
    totalprice = createOrderProduct.selectedProducts.reduce(
      (acc, curr) => acc + (curr.price == null ? 0 : curr.price),
      0,
    );
    createOrderProduct.totalPrice = totalprice;
    const newOrderProduct = new this.orderProductModel(createOrderProduct);
    await newOrderProduct.save();
    return { ok: true, newOrderProduct };
  }
}
