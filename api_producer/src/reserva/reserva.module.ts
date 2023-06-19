import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { Partitioners } from 'kafkajs';
import { ReservaService } from './reserva.service';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_RESERVAR',
        transport: Transport.KAFKA,
        options: {
          client: {
            // TODO: Teste
            brokers: [
              'localhost:9094', 
              'host.docker.internal:9092',
             'host.docker.internal:9094',
             'host.docker.internal:172.17.0.1'
            ],
          },

          consumer: {
            groupId: 'reserva-consumer-group' + Math.random(),
          },
        },
      },
    ]),
  ],
  controllers: [ReservaController],
  providers: [ReservaService, PrismaService],
})
export class ReservaModule { }
