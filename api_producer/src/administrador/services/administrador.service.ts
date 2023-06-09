import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import Administrador from '../entity/Administrador';

@Injectable()
export class AdministadorService {
  constructor(private readonly managerRepository: PrismaService) {}

  async create(CreateManagerDto: CreateManagerDto) {
    const { nome, email, uuid_firebase } = CreateManagerDto;

    const emailExists: Administrador =
      await this.managerRepository.administrador.findFirst({
        where: { email },
      });

    if (emailExists) {
      throw new ConflictException(
        `Administrador com o email '${email}' já está em uso.`,
      );
    }

    const administrador: Administrador =
      await this.managerRepository.administrador.create({
        data: {
          nome,
          email,
          uuid_firebase,
        },
      });

    return administrador;
  }

  async findEmail(email: string) {
    const clienteResultDB =
      await this.managerRepository.administrador.findUnique({
        where: {
          email,
        },
      });
    return clienteResultDB;
  }

  async findOne(id: number) {
    const clienteResultDB =
      await this.managerRepository.administrador.findFirst({
        where: {
          id: id,
        },
      });
    return clienteResultDB;
  }

  async findOneUuid(uuid: string) {
    const clienteResultDB =
      await this.managerRepository.administrador.findFirst({
        where: {
          uuid_firebase: uuid,
        },
      });
    return clienteResultDB;
  }

  async getAll() {
    try {
      const managers = await this.managerRepository.administrador.findMany({
        include: {
          estacionamentos: true,
        },
      });
      return managers;
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível buscar os administradores.',
        error,
      );
    }
  }

  async findById(id: number) {
    const manager: Administrador =
      await this.managerRepository.administrador.findUnique({
        where: { id },
        include: {
          estacionamentos: true,
        },
      });

    if (!manager) {
      throw new NotFoundException(`Administrador com ID ${id} não encontrado.`);
    }

    return manager;
  }

  async update(id: number, updateManagerDto: UpdateManagerDto) {
    const { nome, email } = updateManagerDto;

    const existingManager =
      await this.managerRepository.administrador.findUnique({
        where: { id },
      });

    if (!existingManager) {
      throw new NotFoundException(
        `Administrador com o ID '${id}' não encontrado.`,
      );
    }

    const emailExists: Administrador =
      await this.managerRepository.administrador.findFirst({
        where: { email },
      });

    if (!emailExists) {
      throw new ConflictException(
        `Administrador com o email: ${email} não existe.`,
      );
    }

    const updatedManager: Administrador =
      await this.managerRepository.administrador.update({
        where: { id },
        data: {
          nome,
          email,
        },
      });

    return updatedManager;
  }

  async remove(id: number) {
    const existingManager: Administrador =
      await this.managerRepository.administrador.findUnique({
        where: { id },
      });

    if (!existingManager) {
      throw new NotFoundException(
        `Administrador com o ID '${id}' não encontrado.`,
      );
    }

    const deletedManager = await this.managerRepository.administrador.delete({
      where: { id },
    });

    return deletedManager;
  }
}
