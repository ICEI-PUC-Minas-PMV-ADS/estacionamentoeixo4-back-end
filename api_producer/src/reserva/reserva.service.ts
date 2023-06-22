import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
                return new InternalServerErrorException("Erro ao listar reservas" + err)

            });

        return reservas
    }

    async findAllAdm(id_administrador: number) {
        const admAndEstacionamento = await this.reservaRepository.estacionamentoAndAdministradores.findMany({
            where: {
                id_administrador: Number(id_administrador)
            }
        });



        if (!admAndEstacionamento) {
            return new BadRequestException("Estacioanmento não associado a essa reserva!")
        }
        let estacionamentos = admAndEstacionamento.map(park => park.id_estacionamento);

        const reservas = await this.reservaRepository
            .$queryRaw(Prisma.sql`SELECT 
                                        name,
                                        duracao, 
                                        horario_reserva,
                                        razao_social
                                    FROM reserva AS r
                                    JOIN cliente AS c  ON r.id_cliente = c.id 
                                    JOIN estacionamento AS e ON r.id_estacionamento = e.id
                                    WHERE "canceledAt" IS NULL AND
                                    id_estacionamento IN (${Prisma.join(estacionamentos, ',')})`
            ).catch(err => {
                return new InternalServerErrorException("Erro ao listar reservas" + err)

            });

        return reservas
    }




    async findOne(id: number) {
        const reserva = await this.reservaRepository.reserva.findFirst({
            where: {
                id: id
            }
        }).catch(err => {
            console.log(err);
            return new InternalServerErrorException("Erro ao encontrar reserva" + err)
        });

        return reserva
    }



    async findReservasUser(id: number) {
        const reserva = await this.reservaRepository.reserva.findMany({
            where: {
                id_cliente: Number(id),
                canceledAt: null
            }
        }).catch(err => {
            console.log(err);
            return new InternalServerErrorException("Erro ao encontrar reservas do cliente" + err)
        });

        return reserva
    }

}