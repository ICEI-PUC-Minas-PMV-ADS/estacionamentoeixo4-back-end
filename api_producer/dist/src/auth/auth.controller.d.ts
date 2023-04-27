import { AuthService } from './auth.service';
import { AuthDTO } from './dto/me.input';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    me(auth: AuthDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: Request): void;
}
