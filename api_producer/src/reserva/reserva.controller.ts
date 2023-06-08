import { Producer } from 'kafkajs';
import { Controller, Post, Body, Patch, OnModuleInit, Inject, InternalServerErrorException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { CanceledReservaDto } from './dto/cancelar-reserva.dto';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientKafka } from '@nestjs/microservices';

@ApiTags('Reserva')
@Controller('reserva')
export class ReservaController implements OnModuleInit {
  kafkaProducer: Producer;
  constructor(@Inject('KAFKA_PRODUCER_RESERVA') private clientKafka: ClientKafka) { }
  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('reservar_vaga');
    this.clientKafka.subscribeToResponseOf('cancelar_vaga');
    await this.clientKafka.connect().then(() => {
      console.log("Kafka connected");

    }).then(err => console.error("Kafka error", err));
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Reserva criada com sucesso!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: [CreateReservaDto] })
  async create(@Body() createReservaDto: CreateReservaDto) {
    console.log(createReservaDto);

    //Envia os dados para o kafka e espera a resposta
    this.clientKafka.send(
      'reservar_vaga',
      JSON.stringify({ data: createReservaDto }),
    ).subscribe({
      next: (reply: any) => {
        console.log("Vaga Criada com sucesso!", reply);
      },
      error: error => {
        throw new InternalServerErrorException("Erro interno do kafka", error)
      }
    });


  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Reserva cancelada com sucesso!',
  })
  @ApiBody({ type: [CanceledReservaDto], description: 'Reserva cancelada' })
  async update(@Body() canceledReservaDto: CanceledReservaDto) {
    this.clientKafka.send(
      'cancelar_vaga',
      JSON.stringify({ data: canceledReservaDto }),
    ).subscribe({
      next: (reply: any) => {
        console.log("Vaga atualizada com sucesso!", reply);
      },
      error: (error) => {
        throw new InternalServerErrorException("Erro interno do kafka", error)

      }
    });
  }
}
