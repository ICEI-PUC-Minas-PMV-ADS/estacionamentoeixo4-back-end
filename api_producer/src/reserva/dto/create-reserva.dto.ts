import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateReservaDto {
  @IsNumber()
  // @ApiProperty({
  //   description: 'Id do cliente',
  //   minimum: 1,
  //   default: 1,
  //   type: 'number',
  // })
  // @IsNotEmpty()
  id_cliente: number;

  @IsNumber()
  // @ApiProperty({
  //   description: 'Id do veículo',
  //   minimum: 1,
  //   default: 1,
  //   type: 'number',
  // })
  // @IsNotEmpty()
  id_veiculo: number;

  @IsNumber()
  // @ApiProperty({
  //   description: 'Id do estacionamento',
  //   minimum: 1,
  //   default: 1,
  //   type: 'number',
  // })
  // @IsNotEmpty()
  id_estacionamento: number;

  @IsNumber()
  // @ApiProperty({
  //   description: 'Duração da reserva',
  //   default: 1212242552,
  //   type: 'number',
  // })
  // @IsNotEmpty()
  duracao: number;

  @IsDateString()
  // @ApiProperty({
  //   description: 'Horário da reserva',
  //   default: Date.now(),
  //   type: 'data',
  // })
  // @IsNotEmpty()
  horario_reserva: string;
}
