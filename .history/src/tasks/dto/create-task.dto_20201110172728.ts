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
  @IsString()
  @MinLength(4)
  description: string;
  @IsBoolean()
  done: boolean;
}
//DTO sirve para transferir datos
