import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { Veiculo } from '@prisma/client';
import { Cache } from 'cache-manager';

@Injectable()
export class VeiculoService {
  constructor(
    private readonly veiculoRepository: PrismaService,
    @Inject(CACHE_MANAGER) private readonly veiculoCache: Cache,
  ) {}

  /**
   * @function Create Veiculo
   * @param creatVeiculoDto
   * @returns Veiculo Created
   */
  async create(createVeiculoDto: CreateVeiculoDto) {
    const isExistVeiculo = await this.veiculoRepository.veiculo.findFirst({
      where: { placa: createVeiculoDto.placa },
    });

    if (isExistVeiculo) {
      throw new BadRequestException(
        `O Veíclo ${createVeiculoDto.placa} já está cadastrado`,
      );
    }

    const veiculoResult: Veiculo = await this.veiculoRepository.veiculo.create({
      data: createVeiculoDto,
    });

    if (!veiculoResult) {
      throw new InternalServerErrorException(
        `Não foi possível criar o veículo `,
      );
    }

    await this.veiculoCache.set(
      `user_crated_${veiculoResult.id}`,
      veiculoResult,
    );
    return veiculoResult;
  }

  async findAll() {
    const veiculosResultDB = await this.veiculoRepository.veiculo.findMany();

    if (!veiculosResultDB) throw new NotFoundException('Não existe veículos!');

    await this.veiculoCache.del('veiculos_cache');
    await this.veiculoCache.set('veiculos_cache', veiculosResultDB);

    return veiculosResultDB;
  }

  async findOne(id: number) {
    const veiculosResultDB = await this.veiculoRepository.veiculo.findUnique({
      where: {
        id,
      },
    });

    return veiculosResultDB;
  }

  async update(id: number, updateVeiculoDto: UpdateVeiculoDto) {
    const veiculoUpdateResult = this.veiculoRepository.veiculo.update({
      where: {
        id,
      },
      data: updateVeiculoDto,
    });

    if (!veiculoUpdateResult) {
      throw new InternalServerErrorException(
        `Não foi possível atualizar o veículo `,
      );
    }

    await this.veiculoCache.set(
      `user_crated_${veiculoUpdateResult.id}`,
      veiculoUpdateResult,
    );

    return veiculoUpdateResult;
  }

  async remove(id: number) {
    const veiculoDeleteResult = this.veiculoRepository.veiculo.delete({
      where: {
        id,
      },
    });

    if (!veiculoDeleteResult) {
      throw new InternalServerErrorException(
        `Não foi possível remover o veículo `,
      );
    }

    await this.veiculoCache.del('veiculos_cache');

    return veiculoDeleteResult;
  }
}
