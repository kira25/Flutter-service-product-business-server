import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  Allow,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsDefined()
  @IsNotEmpty()
  password: string;
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  identifier: number;
  @IsDefined()
  @IsNumber()
  cellphone: number;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  shopName: string;
}
