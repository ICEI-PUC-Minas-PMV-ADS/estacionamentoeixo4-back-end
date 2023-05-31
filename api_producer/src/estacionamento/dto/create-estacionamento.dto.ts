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
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
  })
  preco: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
  })
  vagas_preferenciais: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
  })
  vagas_gerais: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
  })
  razao_social: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
  })
  @MaxLength(14)
  cnpj: string;
}
