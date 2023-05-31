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

export class UpdateEstacionamentoDto extends PartialType(
  CreateEstacionamentoDto,
) {
  @IsDecimal()
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
    default: 24,
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
    type: 'string',
  })
  @MaxLength(14)
  cnpj: string;
}
