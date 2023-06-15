import { Producer } from 'kafkajs';
import { Controller, Post, Body, Patch, OnModuleInit, Inject, InternalServerErrorException, Get, Param, BadRequestException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { CanceledReservaDto } from './dto/cancelar-reserva.dto';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientKafka } from '@nestjs/microservices';
import { ReservaService } from './reserva.service';

@ApiTags('Reserva')
@Controller('reserva')
export class ReservaController implements OnModuleInit {
  kafkaProducer: Producer;
  constructor(@Inject('KAFKA_RESERVAR') private clientKafka: ClientKafka,
    private readonly reservaService: ReservaService) { }
  async onModuleInit() {
    //Response the kafka
    this.clientKafka.subscribeToResponseOf('reservar_vaga');
    this.clientKafka.subscribeToResponseOf('cancelar_vaga');
    await this.clientKafka.connect().then((e) => {
      console.log("Kafka connected");
    }).catch(err => console.error("Kafka error", err));
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
      next: (reply: { CODE: number, MESSAGE: string }) => {
        //Trata as menssaens 
        if (reply.CODE === 405 || reply.CODE === 400)
          return new BadRequestException(reply.MESSAGE);
        else if (reply.CODE === 200 || reply.CODE === 201)
          return reply.MESSAGE;
      },
      error: error => {
        console.error(error)
        return new InternalServerErrorException(error)
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
      next: (reply: { CODE: number, MESSAGE: string }) => {
        //Trata as menssaens 
        if (reply.CODE === 405 || reply.CODE === 400)
          return new BadRequestException(reply.MESSAGE);
        else if (reply.CODE === 200 || reply.CODE === 201)
          return reply.MESSAGE;
      },
      error: (error) => {
        console.error(error)
        return new InternalServerErrorException(error)

      }
    });
  }

  @Get(':id_estacionamento')
  @ApiResponse({
    status: 200,
    description: 'Reserva cancelada com sucesso!',
  })
  async findReservasEstacionamento(@Param('id_estacionamento') id_estacionamento: number) {
    return await this.reservaService.findAll(id_estacionamento);
  }

  @Get(':id_reserva')
  async findReservasOne(@Param('id_reserva') id_reserva: number) {
    return await this.reservaService.findOne(id_reserva);
  }
}
