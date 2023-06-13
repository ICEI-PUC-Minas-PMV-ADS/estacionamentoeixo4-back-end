import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { Avaliacao } from './entities/avaliacao.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    private readonly avaliacaoRepository: PrismaService
  ) {

  }
  async create(createAvaliacaoDto: CreateAvaliacaoDto) {

    const avaliacaoCreated = await this.avaliacaoRepository.avaliacao.create({
      data: createAvaliacaoDto
    })

    if (!avaliacaoCreated) {
      throw new InternalServerErrorException("Ocorreu algum erro ao inserir avaliação")
    }

    return avaliacaoCreated;
  }

  async findAll(id_estacionamento: number) {
    const avaliacoes = await this.avaliacaoRepository.avaliacao.findMany({
      where: {
        id_estacionamento: id_estacionamento
      }
    }).catch(err => {
      throw new InternalServerErrorException("Error ao encontrar avaliações para esse estacionamento", err)

    });

    return avaliacoes;
  }

  async findOne(id: number) {

    const avaliacao = await this.avaliacaoRepository.avaliacao.findFirst({ where: { id } }).catch(err => {
      throw new InternalServerErrorException("Erro ao encontrar avaliação", err)
    })

    if (!avaliacao) {

      throw new NotFoundException("Avaliação não foi encontrada");
    }
    return avaliacao;
  }

  async update(id_avaliacao: number, updateAvaliacaoDto: UpdateAvaliacaoDto) {

    const avaliacao = await this.avaliacaoRepository.avaliacao.update({
      where: {
        id: id_avaliacao
      },
      data: updateAvaliacaoDto
    }).catch(err => {
      throw new InternalServerErrorException("Erro ao atualizar avaliação", err)
    })
    if (!avaliacao) {

      throw new NotFoundException("Avaliação não foi atualizada");
    }
    return avaliacao;
  }

  async remove(id: number) {

    const avaliacao = await this.avaliacaoRepository.avaliacao.delete({ where: { id } }).catch(
      err => {
        throw new InternalServerErrorException("Erro ao deletar avaliação", err)
      }
    );
    return avaliacao;
  }
}
