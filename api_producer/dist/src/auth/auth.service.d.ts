import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { ClienteService } from '@src/cliente/cliente.service';
import { AuthDTO } from './dto/me.input';
import { ManagerService } from '@src/manager/services/manager.service';
export declare class AuthService {
    private readonly serviceClient;
    private readonly serviceManager;
    private jwtService;
    private readonly authCache;
    private configService;
    constructor(serviceClient: ClienteService, serviceManager: ManagerService, jwtService: JwtService, authCache: Cache, configService: ConfigService);
    private userLogged;
    me(auth: AuthDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            email: any;
            uuid_firebase: any;
        };
    }>;
    logout(uuid_firebase: string): Promise<void>;
    hashData(data: string): Promise<string>;
    updateRefreshToken(userUid: string, refreshToken: string): Promise<void>;
    getTokens(userUUid: string, username: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(userUuId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
