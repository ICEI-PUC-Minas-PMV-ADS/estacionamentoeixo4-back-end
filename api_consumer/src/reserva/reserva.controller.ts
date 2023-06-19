import { Controller, InternalServerErrorException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Reserva } from './entity/reserva.entity';
import { ReservaService } from './reserva.service';

@Controller('reserva')
export class ReservaController {
    constructor(private readonly reservaService: ReservaService) {

    }
    /**
     * Cria a reserva enviado pelo kafka
     * @param param0 
     * @returns 
     */
    @MessagePattern('reservar_vaga')
    async reservarVagas(@Payload() { data }: { data: Reserva }) {
        const reservaCreated = await this.reservaService.create(data)
        return reservaCreated
    }


    /**
     * Cancela a vaga realizada pelo cliente
     * @param param0 
     */
    @MessagePattern('cancelar_vaga')
    async cancelarVagas(@Payload() { data }: { data: number }) {
        const caceledVagaReserva = await this.reservaService.update(data)
        return caceledVagaReserva
    }



}
