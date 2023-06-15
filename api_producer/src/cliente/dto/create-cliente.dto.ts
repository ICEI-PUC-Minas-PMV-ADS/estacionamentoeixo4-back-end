import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsInt,
} from 'class-validator'; //Lib de validação pronta pra usar
import { ApiProperty } from '@nestjs/swagger';
//Classe onde definimos o type da entráda do método createUser(@Body userDTO:CreateUserDto)
export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Nome do cliente',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    type: 'string',
    description: 'Email do cliente',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'CPF do cliente',
  })
  @MaxLength(11)
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'UUid do cliente',
  })
  uuid_firebase: string;
}
