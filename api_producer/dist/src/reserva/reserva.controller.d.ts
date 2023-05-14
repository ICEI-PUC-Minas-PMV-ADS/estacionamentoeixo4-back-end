import { Producer } from 'kafka-node';
import { OnModuleInit } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { CanceledReservaDto } from './dto/cancelar-reserva.dto';
import { KafkaService } from './kafka.service';
export declare class ReservaController implements OnModuleInit {
    private readonly kafkaService;
    kafkaProducer: Producer;
    constructor(kafkaService: KafkaService);
    onModuleInit(): Promise<void>;
    create(createReservaDto: CreateReservaDto): Promise<void>;
    update(canceledReservaDto: CanceledReservaDto): Promise<void>;
}
