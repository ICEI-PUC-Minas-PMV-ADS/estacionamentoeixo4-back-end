import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reserva } from './entity/reserva.entity';

@Injectable()
export class ReservaService {
  constructor(
    private readonly reservaRepository: PrismaService
  ) {
  }

  /**
   *  Create Reserva
   * @param createReserva 
   * @returns 
   */
  async create(createReserva: Reserva) {

    const reservaCreated = await this.reservaRepository.reserva.create({
      data: { ...createReserva, canceledAt: null }
    })

    if (!reservaCreated) {
      return new InternalServerErrorException("Ocorreu algum erro ao inserir reserva")
    }

    return reservaCreated;
  }


  /**
   *  Update Reserva
   * @param id_cliente 
   * @param id_estacionamento 
   * @param id_veiculo 
   * @param reservaUpdate 
   * @returns 
   */

  async update(id_cliente: number, id_estacionamento: number, id_veiculo: number, reservaUpdate: Reserva) {
    const findFirstReserva = await this.reservaRepository.reserva.findFirst({
      where: {
        id_cliente,
        id_veiculo,
        id_estacionamento
      }
    });

    if (!findFirstReserva) {
      return new BadRequestException("Reserva não encontrada!")
    }

    const reservaUpdated = await this.reservaRepository.reserva.update({
      where: {
        id: findFirstReserva.id
      },
      data: { ...findFirstReserva, ...reservaUpdate }
    });


    if (!reservaUpdated) {
      return new InternalServerErrorException("Ocorreu algum erro ao atualizar reserva")
    }


    return reservaUpdated
  }

}
