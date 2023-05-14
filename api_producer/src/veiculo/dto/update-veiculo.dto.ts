import { PartialType } from '@nestjs/mapped-types';
import { CreateVeiculoDto } from './create-veiculo.dto';
import { IsString, MaxLength, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVeiculoDto extends PartialType(CreateVeiculoDto) {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Placa do veículo',
    default: 'oab-xb33',
  })
  @MaxLength(10)
  placa: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    default: 'Carro',
    description: 'Tipo do veículo',
  })
  @MaxLength(10)
  tipo: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    default: 'Fox Wolksvagem',
    description: 'Modelo do veículo',
  })
  @MaxLength(20)
  modelo: string;

  @IsInt()
  @ApiProperty({
    type: 'number',
    description: 'Id do Cliente',
    default: 1,
  })
  @IsNotEmpty()
  id_cliente: number;
}
