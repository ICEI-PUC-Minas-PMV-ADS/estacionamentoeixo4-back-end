import { Producer } from 'kafka-node';
import { Controller, Post, Body, Patch, OnModuleInit } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { CanceledReservaDto } from './dto/cancelar-reserva.dto';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KafkaService } from './kafka.service';

@ApiTags('Reserva')
@Controller('reserva')
export class ReservaController implements OnModuleInit {
  kafkaProducer: Producer;
  constructor(private readonly kafkaService: KafkaService) {}
  async onModuleInit() {
    // this.clientKafka.subscribeToResponseOf('reservar_vaga');
    // this.kafkaProducer = await this.clientKafka.connect();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Reserva criada com sucesso!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: [CreateReservaDto] })
  async create(@Body() createReservaDto: CreateReservaDto) {
    //Envia os dados para o kafka e espera a resposta
    this.kafkaService.sendMessage(
      'reservar_vaga',
      JSON.stringify({ data: createReservaDto, method: 'create' }),
    );
    await this.kafkaService.consumer.on('message', (message) => {
      console.log('Kafka Message:', message);
    });

    await this.kafkaService.consumer.on('error', (error) => {
      console.error('Kafka Error:', error);
    });
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Reserva cancelada com sucesso!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: [CanceledReservaDto], description: 'Reserva cancelada' })
  async update(@Body() canceledReservaDto: CanceledReservaDto) {
    this.kafkaService.sendMessage(
      'reservar_vaga',
      JSON.stringify({ data: canceledReservaDto, method: 'update' }),
    );

    await this.kafkaService.consumer.on('message', (message) => {
      console.log('Kafka Message:', message);
    });

    await this.kafkaService.consumer.on('error', (error) => {
      console.error('Kafka Error:', error);
    });
  }
}
