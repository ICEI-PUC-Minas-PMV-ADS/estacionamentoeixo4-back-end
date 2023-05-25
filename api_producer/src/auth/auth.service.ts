import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { ClienteService } from '@src/cliente/cliente.service';
import { AuthDTO } from './dto/me.input';
import Cliente from '@src/cliente/entity/Cliente';
import { AdministadorService } from '@src/administrador/services/administrador.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
class UserCache {
  refreshToken: string;
  client: Cliente;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly serviceClient: ClienteService,
    private readonly serviceManager: AdministadorService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly authCache: Cache,
    private configService: ConfigService,
  ) {}

  private userLogged: UserCache = null;

  async me(auth: AuthDTO) {
    // Check if user exists
    let user: any = await this.serviceClient.findEmail(auth.email);

    if (!user) {
      user = await this.serviceManager.findEmail(auth.email);
      if (!user) {
        throw new ForbiddenException('Access Denied');
      }
    }

    //Get the token
    const tokens = await this.getTokens(user.uuid_firebase, user.name);

    //Update the token
    await this.updateRefreshToken(user.uuid_firebase, tokens.refreshToken);
    const { id, email, uuid_firebase } = user;
    return { user: { id, email, uuid_firebase }, ...tokens };
  }

  async logout(uuid_firebase: string) {
    return await this.authCache.del(`user_${uuid_firebase}`);
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userUid: string, refreshToken: string) {
    let user: any = await this.serviceClient.findOneUuid(userUid);
    if (!user) {
      user = await this.serviceManager.findOneUuid(userUid);
      if (!user) throw new ForbiddenException('Access Denied');
    }

    const hashedRefreshToken = await this.hashData(refreshToken);

    //Verify is exist userRefreshToken
    const cacheUser = await this.authCache.get<UserCache>(
      `user_${user.uuid_firebase}`,
    );

    if (cacheUser) {
      await this.authCache.del(`user_${user.uuid_firebase}`);
    }

    await this.authCache.set(`user_${user.uuid_firebase}`, {
      user: user,
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userUUid: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userUUid,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userUUid,
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

  async refreshTokens(userUuId: string, refreshToken: string) {
    const userCache = await this.authCache.get<UserCache>(`user_${userUuId}`);

    if (!userCache && !userCache.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await argon2.verify(
      userCache.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    let user: any = await this.serviceClient.findOneUuid(userUuId);

    if (!user) {
      user = await this.serviceManager.findOneUuid(userUuId);
      if (!user) throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user.uuid_firebase, user.name);
    await this.updateRefreshToken(user.uuid_firebase, tokens.refreshToken);
    return tokens;
  }
}
