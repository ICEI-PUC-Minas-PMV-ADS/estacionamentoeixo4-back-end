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
    default: 'JhonDoezinho',
    type: 'string',
    description: 'Nome do cliente',
  })
  @MaxLength(8)
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: 'jhondoezinho@hotmail.com',
    type: 'string',
    description: 'Email do cliente',
  })
  @MaxLength(50)
  email: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    default: '12232123211',
    type: 'string',
    description: 'CPF do cliente',
  })
  @MinLength(11)
  @MaxLength(11)
  cpf: string;
}
