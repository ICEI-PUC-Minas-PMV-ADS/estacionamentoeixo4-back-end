import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async findAll(id: number) {
    const avaliacoes = await this.avaliacaoRepository.avaliacao.findMany({
      where: {
        id_estacionamento: id
      }
    });

    if (!avaliacoes) {
      throw new InternalServerErrorException("A")
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} avaliacao`;
  }

  update(id: number, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return `This action updates a #${id} avaliacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} avaliacao`;
  }
}
