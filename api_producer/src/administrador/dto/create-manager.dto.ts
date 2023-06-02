import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManagerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do administrador',
    type: 'string',
  })
  @MinLength(1)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do administrador',
    type: 'string',
  })
  @MinLength(1)
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'UUId do estacionamento',
    type: 'string',
  })
  @IsString()
  uuid_firebase: string;
}
