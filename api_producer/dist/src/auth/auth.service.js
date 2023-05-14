"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const cliente_service_1 = require("../cliente/cliente.service");
const manager_service_1 = require("../manager/services/manager.service");
class UserCache {
}
let AuthService = class AuthService {
    constructor(serviceClient, serviceManager, jwtService, authCache, configService) {
        this.serviceClient = serviceClient;
        this.serviceManager = serviceManager;
        this.jwtService = jwtService;
        this.authCache = authCache;
        this.configService = configService;
        this.userLogged = null;
    }
    async me(auth) {
        let user = await this.serviceClient.findEmail(auth.email);
        if (!user) {
            user = await this.serviceManager.findEmail(auth.email);
            if (!user) {
                throw new common_1.ForbiddenException('Access Denied');
            }
        }
        const tokens = await this.getTokens(user.uuid_firebase, user.name);
        await this.updateRefreshToken(user.uuid_firebase, tokens.refreshToken);
        const { id, email, uuid_firebase } = user;
        return Object.assign({ user: { id, email, uuid_firebase } }, tokens);
    }
    async logout(uuid_firebase) {
        return await this.authCache.del(`user_${uuid_firebase}`);
    }
    hashData(data) {
        return argon2.hash(data);
    }
    async updateRefreshToken(userUid, refreshToken) {
        let user = await this.serviceClient.findOneUuid(userUid);
        if (!user) {
            user = await this.serviceManager.findOneUuid(userUid);
            if (!user)
                throw new common_1.ForbiddenException('Access Denied');
        }
        const hashedRefreshToken = await this.hashData(refreshToken);
        const cacheUser = await this.authCache.get(`user_${user.uuid_firebase}`);
        if (cacheUser) {
            await this.authCache.del(`user_${user.uuid_firebase}`);
        }
        await this.authCache.set(`user_${user.uuid_firebase}`, {
            user: user,
            refreshToken: hashedRefreshToken,
        });
    }
    async getTokens(userUUid, username) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userUUid,
                username,
            }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync({
                sub: userUUid,
                username,
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(userUuId, refreshToken) {
        const userCache = await this.authCache.get(`user_${userUuId}`);
        if (!userCache && !userCache.refreshToken)
            throw new common_1.ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(userCache.refreshToken, refreshToken);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied');
        let user = await this.serviceClient.findOneUuid(userUuId);
        if (!user) {
            user = await this.serviceManager.findOneUuid(userUuId);
            if (!user)
                throw new common_1.ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user.uuid_firebase, user.name);
        await this.updateRefreshToken(user.uuid_firebase, tokens.refreshToken);
        return tokens;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService,
        manager_service_1.ManagerService,
        jwt_1.JwtService, Object, config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map