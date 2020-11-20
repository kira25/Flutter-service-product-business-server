import {
  IsDefined,
  IsString,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  Allow,
} from 'class-validator';

export class CreateTaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Allow()
  description: string;
  @IsBoolean()
  done: boolean;
  @IsDefined()
  @IsNotEmpty()
  userId: string;
}
//DTO sirve para transferir datos
