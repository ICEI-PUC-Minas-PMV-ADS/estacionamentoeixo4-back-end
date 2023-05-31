import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { configRedisCache } from '@config/redis.config';
import { RouterModule } from './router/router.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { RedisModule, } from 'nestjs-redis';
import 'dotenv/config'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule,

  ],
})

export class AppModule { }
