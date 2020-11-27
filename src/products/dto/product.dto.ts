import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateProductDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  productCategory: Object;
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  stockType: number;
  stock: any[];
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  priceType: number;
  price: Object;
  imageProduct: any[];
  createdAt: Date;
  userId: string;
}
