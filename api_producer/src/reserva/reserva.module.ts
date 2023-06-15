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
            brokers: [process.env.KAFKA_URL],
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
