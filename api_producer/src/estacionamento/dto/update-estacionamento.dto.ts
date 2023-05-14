import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsDecimal,
  IsNotEmpty,
} from 'class-validator';
import { CreateEstacionamentoDto } from './create-estacionamento.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UpdateEstacionamentoDto extends PartialType(
  CreateEstacionamentoDto,
) {
  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({
    type: 'decimal',
    minimum: 6
  })
  preco: Prisma.Decimal;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number'
  })
  vagas_preferenciais: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    default: 24,
  })
  vagas_gerais: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: 'JhoDoeSJW',
  })
  @MaxLength(255)
  razao_social: string;

  @IsString()
  @MinLength(14)
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: '12.232.423/0001-33',
  })
  @MaxLength(14)
  cnpj: string;
}
