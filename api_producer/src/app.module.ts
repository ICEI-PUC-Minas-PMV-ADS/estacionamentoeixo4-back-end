import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { configRedisCache } from '@config/redis.config';
import { RouterModule } from './router/router.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>(configRedisCache),
    RouterModule,
  ],
})
export class AppModule { }
