import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_RESERVAR',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_URL],
          },
      
          consumer: {
            groupId: 'reserva-consumer-group',
          },
        },
      },
    ]),
  ],
  controllers: [ReservaController],
  providers: [],
})
export class ReservaModule { }
