import {
  Controller,
  CacheInterceptor,
  UseInterceptors,
  Body,
  Post,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/me.input';
import { RefreshTokenGuard } from '@src/common/guards/refreshToken.guard';
import { Request } from 'express';
import { AccessTokenGuard } from '@src/common/guards/accessToken.guard';
import { ApiResponse, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseInterceptors(CacheInterceptor)
  @Post('me')
  @ApiBody({ type: AuthDTO, description: 'Atualiza o refreshToken' })
  @ApiResponse({
    status: 200,
    description: 'Atualiza o refreshToken',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  me(@Body() auth: AuthDTO) {
    return this.authService.me(auth);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Atualiza o refreshToken',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  refreshTokens(@Req() req: Request) {
    return this.authService.refreshTokens(
      req.user['sub'],
      req.user['refreshToken'],
    );
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('logout')
  @ApiResponse({
    status: 200,
    description: 'Logout',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }
}
