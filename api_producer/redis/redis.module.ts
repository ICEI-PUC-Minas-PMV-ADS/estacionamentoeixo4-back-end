import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { redisStore } from "cache-manager-redis-store";


@Module({
    imports: [
        CacheModule.register({
            useFactory: async (configService: ConfigService) => ({
                store: await redisStore({
                    url: configService.get('REDIS_URI'),
                    ttl: 5000
                }),
            }),
            isGlobal: true,
            inject: [ConfigService]
        }),
    ],
    exports: [CacheModule]

})

export class RedisModule {}