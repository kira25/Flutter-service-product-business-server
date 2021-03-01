import { Document } from 'mongoose';

export interface OrdersProducts extends Document {
  orderId: string;
  amountProducts: number;
  clientName: string;
  clientId: string;
  clientAddress: string;
  clientCellphone: string;
  sellerId: string;
  totalPrice: number;

  products: any[];
  createdAt: Date;
}
