import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class LogoutInput {
  @IsString()
  @ApiProperty({
    default: 1,
    type: 'string',
    description: 'token',
  })
  @IsEmpty()
  token: null;
}
