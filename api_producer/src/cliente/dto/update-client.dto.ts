import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
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
 
}
