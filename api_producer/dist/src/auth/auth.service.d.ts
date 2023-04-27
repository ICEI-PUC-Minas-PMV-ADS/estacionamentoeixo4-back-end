import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { ClienteService } from '@src/cliente/cliente.service';
import { AuthDTO } from './dto/me.input';
export declare class AuthService {
    private readonly clienteService;
    private jwtService;
    private readonly authCache;
    private configService;
    constructor(clienteService: ClienteService, jwtService: JwtService, authCache: Cache, configService: ConfigService);
    private userLogged;
    me(auth: AuthDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(id: number): Promise<void>;
    hashData(data: string): Promise<string>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    getTokens(userId: number, username: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(userId: number, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
