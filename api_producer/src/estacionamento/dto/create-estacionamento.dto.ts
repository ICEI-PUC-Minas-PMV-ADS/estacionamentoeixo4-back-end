import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsDecimal,
  IsNotEmpty,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateEstacionamentoDto {
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
    type: 'number'
  })
  vagas_gerais: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
  })
  @MaxLength(255)
  razao_social: string;

  @IsString()
  @MinLength(14)
  @IsNotEmpty()
  @ApiProperty({
    type: 'string'
  })
  @MaxLength(14)
  cnpj: string;
}
