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
  @IsDefined()
  @Allow()
  @IsString()
  description: string;
  @IsBoolean()
  done: boolean;
}
//DTO sirve para transferir datos
