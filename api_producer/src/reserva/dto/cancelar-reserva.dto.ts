import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CanceledReservaDto {
  @IsNumber()
  @ApiProperty({
    description: 'Id Cliente',
    minimum: 1,
    default: 1,
  })
  @IsNotEmpty()
  id_cliente: number;

  @IsNumber()
  @ApiProperty({
    description: 'Id Estacionamento',
    minimum: 1,
    default: 1,
  })
  @IsNotEmpty()
  id_estacionamento: number;

  @IsDateString()
  @ApiProperty({
    description: 'Cancelar  reserva',
    type: 'string',
  })
  @IsNotEmpty()
  canceledAt: string;
}
