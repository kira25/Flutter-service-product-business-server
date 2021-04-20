import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateOrderProductsDTO {
  clientId: string;
  clientName: string;
  clientAddress: string;
  clientCellphone: string;
  sellerId: string;
  orderId: string;
  selectedProducts: any[];
  orderState: number;
  amountProducts: number;
  totalPrice: number;
  deliveryType: number;
}

export class UpdateOrderProductsDTO {
 
  selectedProducts: any[];
  orderState: number;
  totalPrice:number;
  deliveryType: number;
  amountProducts: number;
  deliveryId: string;



}
