import {
  IsDefined,
  IsString,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  Allow,
  IsArray,
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
  @IsArray()
  team: [
    {
      name: string;
      memberId: string;
    },
  ];
}
//DTO sirve para transferir datos
