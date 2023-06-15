import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsInt, IsNotEmpty } from 'class-validator';

export class CreateVeiculoDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Placa do veículo',
  })
  @MaxLength(10)
  placa: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Tipo do veículo',
  })
  @MaxLength(10)
  tipo: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Modelo do veículo',
  })
  @MaxLength(20)
  modelo: string;

  @IsInt()
  @ApiProperty({
    type: 'number',
    default: 1,
  })
  @IsNotEmpty()
  id_cliente: number;
}
