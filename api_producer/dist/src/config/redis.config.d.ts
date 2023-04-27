import { RedisClientOptions } from 'redis';
import 'dotenv/config';
import { CacheModuleOptions } from '@nestjs/common';
export declare const configRedisCache: CacheModuleOptions<RedisClientOptions>;
