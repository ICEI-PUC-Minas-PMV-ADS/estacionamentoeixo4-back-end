import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-client.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { Cache } from 'cache-manager';
import { Cliente } from '@prisma/client';
@Injectable()
export class ClienteService {
  constructor(
    private readonly clientRepository: PrismaService,
    @Inject(CACHE_MANAGER) private readonly clienteCache: Cache,
  ) {}

  /**
   * @function Create Cliente
   * @param createClienteDto
   * @returns Client Created
   */
  async create(createClienteDto: CreateClienteDto) {
    const isExistEmail = await this.clientRepository.cliente.findFirst({
      where: { email: createClienteDto.email },
    });

    if (isExistEmail) {
      throw new BadRequestException(
        `O Email ${createClienteDto.email} já está cadastrado. Por favor, tente recupere a senha!`,
      );
    }

    const clienteResult: Cliente = await this.clientRepository.cliente.create({
      data: createClienteDto,
    });

    if (!clienteResult) {
      throw new InternalServerErrorException(
        `Não foi possível criar o cliente `,
      );
    }

    return clienteResult;
  }

  async findAll() {
    const clientesResultDB = await this.clientRepository.cliente.findMany();

    if (!clientesResultDB) throw new NotFoundException('Não existe clientes!');

    return clientesResultDB;
  }

  async findOne(id: number) {
    const clienteResultDB = await this.clientRepository.cliente.findFirst({
      where: {
        id,
      },
    });

    if (!clienteResultDB) throw new NotFoundException('Cliente não existente!');

    return clienteResultDB;
  }

  async findEmail(email: string) {
    const clienteResultDB = await this.clientRepository.cliente.findUnique({
      where: {
        email,
      },
    });
    return clienteResultDB;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const clienteUpdateResult = this.clientRepository.cliente.update({
      where: {
        id,
      },
      data: updateClienteDto,
    });

    if (!clienteUpdateResult) {
      throw new InternalServerErrorException(
        `Não foi possível atualizar o cliente `,
      );
    }

    return clienteUpdateResult;
  }

  async remove(id: number) {
    const clienteDeleteResult = this.clientRepository.cliente.delete({
      where: {
        id,
      },
    });

    if (!clienteDeleteResult) {
      throw new InternalServerErrorException(
        `Não foi possível remover o cliente `,
      );
    }

    return clienteDeleteResult;
  }

  async removeAll() {
    const clienteDeleteResult = await this.clientRepository.cliente.deleteMany();

    return clienteDeleteResult;
  }
}
