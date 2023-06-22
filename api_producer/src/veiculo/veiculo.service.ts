import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { Veiculo } from '@prisma/client';

@Injectable()
export class VeiculoService {
  constructor(
    private readonly veiculoRepository: PrismaService,
  ) { }

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
      data: {
        modelo: createVeiculoDto.modelo,
        placa: createVeiculoDto.placa,
        tipo: createVeiculoDto.tipo,
        id_cliente: createVeiculoDto.id_cliente,

      },
    });

    if (!veiculoResult) {
      return new InternalServerErrorException(
        `Não foi possível criar o veículo `,
      );
    }
    return veiculoResult;
  }

  async findAll() {
    const veiculosResultDB = await this.veiculoRepository.veiculo.findMany();

    if (!veiculosResultDB) throw new NotFoundException('Não existe veículos!');


    return veiculosResultDB;
  }

  async findAllCliente(id: number) {
    const veiculosResultDB = await this.veiculoRepository.veiculo.findMany({
      where: {
        id_cliente: id
      }
    });

    if (!veiculosResultDB)
      return new NotFoundException('Não existe veículos!');

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
    console.log(id);

    const veiculoUpdateResult = this.veiculoRepository.veiculo.update({
      where: {
        id: Number(id),
      },
      data: {
        modelo: updateVeiculoDto.modelo,
        placa: updateVeiculoDto.placa,
        tipo: updateVeiculoDto.tipo,
        id_cliente: updateVeiculoDto.id_cliente,
      },
    });

    if (!veiculoUpdateResult) {
      throw new InternalServerErrorException(
        `Não foi possível atualizar o veículo `,
      );
    }

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

    return veiculoDeleteResult;
  }
}
