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
  password: string;
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
