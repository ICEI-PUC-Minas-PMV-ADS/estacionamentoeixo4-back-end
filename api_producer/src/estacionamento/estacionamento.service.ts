import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateEstacionamentoDto } from './dto/create-estacionamento.dto';
import { UpdateEstacionamentoDto } from './dto/update-estacionamento.dto';
import Estacionamento from './entity/Estacionamento';

@Injectable()
export class EstacionamentoService {
  constructor(private readonly clientRepository: PrismaService) { }

  /**
   * @function Create Estacionamento
   * @param CreateEstacionamentoDto
   * @returns Estacionamento Created
   */
  async create(
    createEstacionamentoDto: CreateEstacionamentoDto,
    id: number,
  ): Promise<Estacionamento> {
    const alreadyExists: Estacionamento =
      await this.clientRepository.estacionamento.findFirst({
        where: { cnpj: createEstacionamentoDto.cnpj },
        include: {
          administradores: true,
        },
      });

    if (alreadyExists) {
      throw new BadRequestException(
        `O estacionamento ${createEstacionamentoDto.razao_social} já está cadastrado com o CNPJ: ${createEstacionamentoDto.cnpj}. Por favor, tente recuperar a senha!`,
      );
    }

    const createEstacionamento: Estacionamento =
      await this.clientRepository.estacionamento.create({
        data: createEstacionamentoDto,
      });

    //EstacionamentoAndAdministrador
    await this.clientRepository.estacionamentoAndAdministradores
      .create({
        data: {
          id_administrador: id,
          id_estacionamento: createEstacionamento.id,
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(
          `Não foi possível criar o estacionamento.` + err,
        );
      });

    if (!createEstacionamento) {
      throw new InternalServerErrorException(
        `Não foi possível criar o estacionamento.`,
      );
    }

    return createEstacionamento;
  }

  async findOne(id: number): Promise<Estacionamento> {
    const foundEstacionamento: Estacionamento =
      await this.clientRepository.estacionamento.findUnique({
        where: { id: id },
        include: {
          administradores: true,
        },
      });

    if (!foundEstacionamento) {
      throw new InternalServerErrorException(
        `Não foi possível encontrar o estacionamento. id: ${id}`,
      );
    }

    return foundEstacionamento;
  }

  async findEstacionamentosAdm(id_adm: number): Promise<Estacionamento[]> {
    const foundEstacionamento: Estacionamento[] =
      await this.clientRepository.estacionamento.findMany({
        where: { administradores: { some: { id_administrador: id_adm } } },
        include: {
          administradores: true,
        },
      });

    if (!foundEstacionamento) {
      throw new InternalServerErrorException(
        `Não foi possível encontrar os estacionamentos. id: ${id_adm}`,
      );
    }

    return foundEstacionamento;
  }

  async updateOne(
    id: number,
    updateEstacionamentoDto: UpdateEstacionamentoDto,
  ): Promise<Estacionamento> {
    const updatedEstacionamento: Estacionamento =
      await this.clientRepository.estacionamento.update({
        where: { id: id },
        data: updateEstacionamentoDto,
      });

    if (!updatedEstacionamento) {
      throw new InternalServerErrorException(
        `Não foi possível atualizar o estacionamento. id: ${id}`,
      );
    }

    return updatedEstacionamento;
  }

  async remove(id_est: number, id_adm: number): Promise<Estacionamento> {

    const alreadyExists: Estacionamento =
      await this.clientRepository.estacionamento.findFirst({
        where: { id: id_est },
      });

    if (!alreadyExists) {
      throw new BadRequestException(
        `O estacionamento com id: ${id_est} não existe.`,
      );
    }
    // Deleta o registro na tabela EstacionamentoAndAdministrador
    await this.clientRepository.estacionamentoAndAdministradores.delete({
      where: {
        id_estacionamento_id_administrador: {
          id_estacionamento: id_est,
          id_administrador: id_adm
        }
      }
    }).catch((err) => {
      console.error(err)
      throw new BadRequestException("Estacioanmento e adminstiradores não encontardo!")
    })


    const deletedEstacionamento: Estacionamento =
      await this.clientRepository.estacionamento.delete({
        where: { id: id_est },
      });

    return deletedEstacionamento
  }
}
