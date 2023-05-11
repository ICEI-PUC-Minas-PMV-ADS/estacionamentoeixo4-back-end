import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @IsInt()
  @ApiProperty({
    default: 1,
    type: 'number',
    description: 'Id do cliente',
  })
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: 'saxnovaesgomes@gmail.com',
    type: 'string',
    description: 'Email do cliente',
  })
  @IsEmail()
  email: string;
}
