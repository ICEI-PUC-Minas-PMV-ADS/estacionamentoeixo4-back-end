"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configRedisCache = void 0;
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
require("dotenv/config");
exports.configRedisCache = {
    store: cache_manager_redis_store_1.redisStore,
    host: process.env.HOST_REDIS,
    password: process.env.PWD_REDIS,
    port: Number(process.env.PORT_REDIS),
    isGlobal: true,
};
//# sourceMappingURL=redis.config.js.map