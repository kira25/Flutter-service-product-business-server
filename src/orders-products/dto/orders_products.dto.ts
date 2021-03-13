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

  amountProducts: number;

  totalPrice: number;
}
