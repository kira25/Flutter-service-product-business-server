import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateOrderProductsDTO {
  orderId: string;
  amountProducts: number;
  clientName: string;
  clientId: string;
  clientAddress: string;
  clientCellphone: string;
  sellerId: string;
  totalPrice: number;
  product: any[];
}
