import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import 'dotenv/config';
import { CacheModuleOptions } from '@nestjs/cache-manager';

export const configRedisCache: CacheModuleOptions<RedisClientOptions> = {
  store: redisStore.redisStore,
  host: process.env.HOST_REDIS || 'redis_whypk',
  password: process.env.PWD_REDIS,
  port: Number(process.env.PORT_REDIS),
  isGlobal: true,
};
