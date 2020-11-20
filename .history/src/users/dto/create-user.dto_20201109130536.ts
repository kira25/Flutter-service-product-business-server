import {
  IsDefined,
  isNotEmpty,
  IsEmail,
  IsNumber,
  Allow,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  firstname: string;
  @IsDefined()
  lastname: string;
  @IsDefined()
  password: string;
  @IsDefined()
  email: string;
  @IsDefined()
  identifier: number;
  @IsDefined()
  cellphone: number;
  @IsDefined()
  shopName: string;
}
