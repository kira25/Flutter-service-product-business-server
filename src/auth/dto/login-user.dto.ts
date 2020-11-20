import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  Allow,
} from 'class-validator';

export class LoginUserDto {
  @IsDefined()
  @IsNotEmpty()
  password: string;
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
