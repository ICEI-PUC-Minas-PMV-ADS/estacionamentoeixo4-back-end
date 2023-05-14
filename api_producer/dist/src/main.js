"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const package_json_1 = require("../package.json");
require("dotenv/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(helmet_1.default.hidePoweredBy());
    app.use(helmet_1.default.frameguard({
        action: 'sameorigin',
    }));
    app.use(helmet_1.default.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    }));
    app.use(helmet_1.default.noSniff());
    app.use(helmet_1.default.referrerPolicy({
        policy: 'strict-origin-when-cross-origin',
    }));
    app.enableCors();
    app.setGlobalPrefix('api_producer');
    if (process.env.ENVIRONMENT === 'dev') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Why Park')
            .addBearerAuth()
            .setDescription('Why Park API Documentation')
            .setVersion(package_json_1.version)
            .build();
        const documentation = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, documentation);
    }
    const port = process.env.PORT || 3000;
    await app.listen(port);
}
exports.bootstrap = bootstrap;
bootstrap();
//# sourceMappingURL=main.js.map