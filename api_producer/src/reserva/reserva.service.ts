import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ReservaService {
    constructor(private readonly reservaRepository: PrismaService) {
    }

    async findAll(id_estacionamento: number) {

        const reservas = await this.reservaRepository
            .$queryRaw(Prisma.sql`SELECT * 
                                          FROM reserva AS r
                                          JOIN cliente ON r.id_cliente = cliente.id 
                                          WHERE r.id_estacionamento = ${Number(id_estacionamento)};`
            ).catch(err => {
                throw new InternalServerErrorException("Erro ao listar reservas", err)

            });

        return reservas
    }


    async findOne(id: number) {
        const reserva = await this.reservaRepository.reserva.findFirst({
            where: {
                id_cliente: Number(id)
            }
        }).catch(err => {
            console.log(err);
            throw new InternalServerErrorException("Erro ao encontrar reserva", err)
        });

        return reserva
    }

}