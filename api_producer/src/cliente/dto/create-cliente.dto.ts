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
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Email do cliente',
  })
  @MaxLength(50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'CPF do cliente',
  })
  @MinLength(11)
  @MaxLength(11)
  cpf: string;
}
