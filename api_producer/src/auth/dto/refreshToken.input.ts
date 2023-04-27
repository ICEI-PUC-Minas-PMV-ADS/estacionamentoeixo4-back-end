import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshInput {
  @IsString()
  @ApiProperty({
    default: 1,
    type: 'string',
    description: 'refreshToken',
  })
  @IsNotEmpty()
  refreshToken: string;
}
