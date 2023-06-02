import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({
    type: 'string',
    description: 'Id do cliente',
  })
  @IsNotEmpty()
  uuid_firebase: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Email do cliente',
  })
  @IsEmail()
  email: string;
}
