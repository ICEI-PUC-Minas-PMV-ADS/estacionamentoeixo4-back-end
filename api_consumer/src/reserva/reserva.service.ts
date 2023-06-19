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
      return {
        CODE: 405,
        MESSAGE: "Ocorreu algum erro ao reservar vaga, tente novamente por favor!"
      };

    }
    return {
      CODE: 201,
      MESSAGE: "Reserva feita com sucesso!"
    };
  }

  /**
   *  Update Reserva
   * @param id_cliente 
   * @param id_estacionamento 
   * @param id_veiculo 
   * @param reservaUpdate 
   * @returns 
   */

  async update(id_reserva: number) {
    const findFirstReserva = await this.reservaRepository.reserva.findFirst({
      where: {
        id: id_reserva,
      }
    })

    if (!findFirstReserva) {
      return {
        CODE: 400,
        MESSAGE: "Reserva não encontrada, tente novamente por favor!"
      };
    }

    const updateReserva = await this.reservaRepository.reserva.update({
      where: {
        id: findFirstReserva.id
      },
      data: { ...findFirstReserva, canceledAt: new Date() }
    })

    if (!updateReserva) {
      return {
        CODE: 405,
        MESSAGE: "Ocorreu algum erro ao cancelar reserva, tente novamente por favor!"
      };

    }
    return {
      CODE: 200,
      MESSAGE: "Reserva cancelada com sucesso!"
    };
  }

}