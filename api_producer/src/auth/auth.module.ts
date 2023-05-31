import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { ClienteService } from '@src/cliente/cliente.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshTonek.strategy';
import { AdministadorService } from '@src/administrador/services/administrador.service';
import { RedisModule } from 'redis/redis.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({}), RedisModule,
  ],
  providers: [
    AdministadorService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ClienteService,
    PrismaService,

  ],
  controllers: [AuthController],

  exports: [AuthService],
})
export class AuthModule { }
