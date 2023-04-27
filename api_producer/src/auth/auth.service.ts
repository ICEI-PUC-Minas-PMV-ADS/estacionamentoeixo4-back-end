import {
  BadRequestException,
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { Cliente } from '@prisma/client';
import { ClienteService } from '@src/cliente/cliente.service';
import { AuthDTO } from './dto/me.input';
class UserCache {
  refreshToken: string;
  client: Cliente;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly clienteService: ClienteService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly authCache: Cache,
    private configService: ConfigService,
  ) {}

  private userLogged: UserCache = null;

  async me(auth: AuthDTO) {
    // Check if user exists
    const user = await this.clienteService.findEmail(auth.email);

    if (!user) throw new BadRequestException('User does not exist');

    //Get the token
    const tokens = await this.getTokens(user.id, user.name);

    //Update the token
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(id: number) {
    return await this.authCache.del(`user_${id}`);
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.clienteService.findOne(userId);

    if (!user) throw new BadRequestException('User not found');

    const hashedRefreshToken = await this.hashData(refreshToken);

    //Verify is exist userRefreshToken
    const cacheUser = await this.authCache.get<UserCache>(`user_${user.id}`);

    if (cacheUser) {
      await this.authCache.del(`user_${user.id}`);
    }

    await this.authCache.set(`user_${user.id}`, {
      user: user,
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const userCache = await this.authCache.get<UserCache>(`user_${userId}`);

    if (!userCache && !userCache.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      userCache.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const user = await this.clienteService.findOne(userId);
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
