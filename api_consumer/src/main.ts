import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_URL],
      },
      consumer: {
        groupId: 'reserva-consumer-group'
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3030);
}
bootstrap();