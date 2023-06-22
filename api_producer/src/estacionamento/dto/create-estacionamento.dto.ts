import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsLatitude,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateEstacionamentoDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    description: "Preço"
  })
  preco: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    description: "Vagas Preferenciais"
  })
  vagas_preferenciais: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    description: "Vagas Gerais"
  })
  vagas_gerais: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: "Razão social"
  })
  razao_social: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: "CNPJ"

  })
  cnpj: string;

  // Fields Address
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    description: "CEP"
  })
  cep: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: "Bairro"
  })
  @MaxLength(25)
  bairro: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: "Endereco"

  })
  @MaxLength(50)
  endereco: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    description: "Número"
  })
  numero: number;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: "Cidade"
  })
  @MaxLength(25)
  cidade: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: "UF"
  })
  @MaxLength(2)
  uf: string;


  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    description: "Latitude"
  })
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    description: "Longitude"
  })
  lgt: number;

}
