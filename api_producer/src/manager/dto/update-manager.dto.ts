import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateManagerDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do administrador',
    type: 'string',
    default: 'jhoh Doe',
  })
  @MinLength(1)
  nome: string;

  @IsString()
  @ApiProperty({
    description: 'Email do administrador',
    type: 'string',
    default: 'jhohdoe@hotmail.com',
  })
  @MinLength(1)
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Id do estacionamento',
    type: 'string',
    default: 1,
  })
  @IsInt()
  id_estacionamento: number;
}
