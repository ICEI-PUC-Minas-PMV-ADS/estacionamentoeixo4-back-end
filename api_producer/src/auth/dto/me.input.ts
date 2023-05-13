import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({
    default: 1,
    type: 'string',
    description: 'Id do cliente',
  })
  @IsNotEmpty()
  uuid_firebase: string;

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
