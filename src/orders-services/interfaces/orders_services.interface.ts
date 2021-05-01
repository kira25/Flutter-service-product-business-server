import { Document } from 'mongoose';

export interface OrdersServices extends Document {
  clientId: string;
  clientName: string;
  clientAddress: string;
  clientCellphone: string;
  sellerId: string;
  serviceId: String,
  orderState : number;
  createdAt: Date;
 

}
