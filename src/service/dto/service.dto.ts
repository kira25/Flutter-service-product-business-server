import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateServiceDTO {
  name: string;

  description: string;
  deliveryTime: string;
  attentionHours: string;

  availableType: number;
  location: Object;
  address: string;

  priceType: number;
  districtAvailable: any[];
  price: Object;
  imageService: any[];
  createdAt: Date;
  userId: string;
  isAvailable: Boolean;
}

export class UpdateServiceDTO {
  deliveryTime: string;
  attentionHours: string;
  availableType: number;
  location: Object;
  address: string;
  priceType: number;
  districtAvailable: any[];
  price: Object;
  isAvailable: Boolean;
}
