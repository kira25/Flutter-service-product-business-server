import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/interfaces/product.interface';
import { User } from 'src/users/interfaces/users.interface';
import {
  CreateOrderProductsDTO,
  UpdateOrderProductsDTO,
} from './dto/orders_products.dto';
import { OrdersProducts } from './interfaces/orders_products.interface';
import * as uuid from 'uuid';
import { ProductsService } from 'src/products/products.service';
import { ORDER_PRODUCT_STAGE } from 'src/common/enum';

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
      (acc, curr) => acc + (curr.price == null ? 0 : curr.amount*curr.price),
      0,
    );
    createOrderProduct.totalPrice = totalprice;
    const newOrderProduct = new this.orderProductModel(createOrderProduct);
    await newOrderProduct.save();
    return { ok: true, newOrderProduct };
  }

  async getUserOrderProducts(data: any) {
    const email = data.email;
    const user = await this.userModel.findOne({ email: email });
    if (!user) return { ok: false, response: 'No user found' };
    const orderProduct = await this.orderProductModel.find({
      sellerId: user._id,
    });
    if (orderProduct.length == 0)
      return { ok: false, response: 'No Order Products' };
    return { ok: true, orderProduct };
  }

  //CAMBIAR EL ESTADO DE LA ORDEN DEL PRODUCTO
  async updateOrderProduct(
    orderProduct: UpdateOrderProductsDTO,
    orderProductID: string,
  ) {
    const order = await this.orderProductModel.findById(orderProductID);
    if (!order) return { ok: false, response: 'No Order Product' };
    let totalprice = 0;
    totalprice = orderProduct.selectedProducts.reduce(
      (acc, curr) => acc + (curr.price == null ? 0 : curr.amount*curr.price),
      0,
    );
    orderProduct.totalPrice = totalprice;

    let totalproduct = 0;
    totalproduct = orderProduct.selectedProducts.reduce(
      (acc, curr) => acc + (curr.amount == null ? 0 : curr.amount),
      0,
    );
    orderProduct.amountProducts = totalproduct;
    const stateOrderProduct = await this.orderProductModel.findByIdAndUpdate(
      orderProductID,
      {
        selectedProducts: orderProduct.selectedProducts,
        orderState: orderProduct.orderState,
        totalPrice: orderProduct.totalPrice,
        deliveryType: orderProduct.deliveryType ,
        amountProducts: orderProduct.amountProducts
      },
      { new: true, useFindAndModify: false },
    );
    return { ok: true, stateOrderProduct };
  }
}
