import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CanceledReservaDto {
  @IsNumber()
  @ApiProperty({
    description: 'Id Reserva',
    minimum: 1,
  })
  @IsNumber()
  @ApiProperty({
    description: 'Id Veículo',
    minimum: 1,
  })
  @IsNotEmpty()
  id_veiculo: number;

}