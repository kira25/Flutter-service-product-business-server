import { Document } from 'mongoose';

export interface OrdersProducts extends Document {
  clientId: string;
  clientName: string;
  clientAddress: string;
  clientCellphone: string;
  readonly amountProducts: number;
  sellerId: string;
  readonly totalPrice: number;
  orderId: string;
  selectedProducts: any[];
  orderState : number;
  createdAt: Date;
  deliveryType: number,
  deliveryId: string,

}
