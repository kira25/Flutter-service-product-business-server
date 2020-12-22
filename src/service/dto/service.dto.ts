import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateServiceDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;
  deliveryTime: string;
  attentionHours: string;
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  availableType: number;
  location: Object;
  address: string;
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  priceType: number;
  districtAvailable: any[];
  price: Object;
  imageService: any[];
  createdAt: Date;
  userId: string;
  isAvailable: Boolean;
}

export class UpdateServiceDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  deliveryTime: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  attentionHours: string;
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  availableType: number;
  location: Object;
  address: string;
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  priceType: number;
  districtAvailable: any[];
  price: Object;

}
