import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateManagerDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do administrador',
    type: 'string',
  })
  @MinLength(1)
  nome: string;

  @IsString()
  @ApiProperty({
    description: 'Email do administrador',
    type: 'string',
  })
  @MinLength(1)
  email: string;
}
