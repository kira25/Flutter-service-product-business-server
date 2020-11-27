import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  Allow,
  MinLength,
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
  @MinLength(4)
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
  @IsDefined()
  role: number;
  @Allow()
  resetPwdPing: string;
  @Allow()
  resetPingUsed: boolean;
  @Allow()
  isShopInfo: boolean;
}
