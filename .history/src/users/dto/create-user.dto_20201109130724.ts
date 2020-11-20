import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  Allow,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  firstname: string;
  @IsDefined()
  @IsNotEmpty()
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
  identifier: number;
  @IsDefined()
  cellphone: number;
  @IsDefined()
  @IsNotEmpty()
  shopName: string;
}
