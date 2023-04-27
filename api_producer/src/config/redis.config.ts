import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import 'dotenv/config';
import { CacheModuleOptions } from '@nestjs/common';

export const configRedisCache: CacheModuleOptions<RedisClientOptions> = {
  store: redisStore,
  host: process.env.HOST_REDIS,
  password: process.env.PWD_REDIS,
  port: Number(process.env.PORT_REDIS),
  isGlobal: true,
};
