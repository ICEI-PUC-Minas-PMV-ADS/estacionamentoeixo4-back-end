import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { Partitioners } from 'kafkajs';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CONSUMER_RESERVA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAKFA_URL],
          },
          producer: {
            createPartitioner: Partitioners.DefaultPartitioner,
          },
          consumer: {
            groupId: 'reserva-consumer-group',
          },
        },
      },
    ]),
  ],
  controllers: [ReservaController],
  providers: [KafkaService],
})
export class ReservaModule {}
