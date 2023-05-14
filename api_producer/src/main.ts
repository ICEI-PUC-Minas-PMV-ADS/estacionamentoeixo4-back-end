import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { version } from '../package.json';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/**
 * @function bootsrap
 * Cria o servidor express
 */
export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validações globais
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Configuração do helmet
   *   O Helmet pode ajudar a proteger seu aplicativo de algumas vulnerabilidades da Web conhecidas,
   *   definindo os cabeçalhos HTTP de forma adequada. Geralmente, o Helmet é apenas uma coleção de
   *   funções de middleware menores que definem cabeçalhos HTTP relacionados à segurança
   *
   */
  app.use(helmet.hidePoweredBy());
  app.use(
    helmet.frameguard({
      action: 'sameorigin',
    }),
  );
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    }),
  );
  app.use(helmet.noSniff());
  app.use(
    helmet.referrerPolicy({
      policy: 'strict-origin-when-cross-origin',
    }),
  );
  //Habilita o cors
  app.enableCors();
  //Seta o prefix inicial da rota http:localhost:3000/api_producer
  app.setGlobalPrefix('api_producer');

  if (process.env.ENVIRONMENT === 'dev') {
    const config = new DocumentBuilder()
      .setTitle('Why Park')
      .addBearerAuth()
      .setDescription('Why Park API Documentation')
      .setVersion(version)
      .build();
    const documentation = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentation);
  }

  //Listener server express
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
