import { IsNotEmpty, IsString } from 'class-validator';

export class AuthObject {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
