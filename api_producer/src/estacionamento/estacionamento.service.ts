import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateEstacionamentoDto } from './dto/create-estacionamento.dto';
import { UpdateEstacionamentoDto } from './dto/update-estacionamento.dto';
import Estacionamento from './entity/Estacionamento';
import { Endereco } from './entity/Endereco';

@Injectable()
export class EstacionamentoService {
  constructor(private readonly clientRepository: PrismaService) { }

  /**
   * @function Create Estacionamento
   * @param CreateEstacionamentoDto
   * @returns Estacionamento Created
   */
  async create(
    estacionamento: Estacionamento,
    endereco: Endereco,
    id: number,
  ): Promise<any> {

    // Recupera se o estacionamento existe
    const alreadyExists: Estacionamento =
      await this.clientRepository.estacionamento.findFirst({
        where: { cnpj: estacionamento.cnpj },
        include: {
          administradores: true,
        },
      });

    if (alreadyExists) {
      throw new BadRequestException(
        `O estacionamento ${estacionamento.razao_social} já está cadastrado com o CNPJ: ${estacionamento.cnpj}. Por favor, tente recuperar a senha!`,
      );
    }

    // Insere o registro
    const createEstacionamento: Estacionamento =
      await this.clientRepository.estacionamento.create({
        data: estacionamento,
      }).catch(err => {
        throw new InternalServerErrorException("Erro ao inserir dados" + err)
      });


    //Insere registro na tabela Pivot EstacionamentoAndAdministrador
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


    //Insere os dados do Endereço do estacionamento 
    const enderecoCreated = await this.clientRepository.endereco.create({
      data: {
        cidade: endereco.cidade,
        endereco: endereco.endereco,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cep: endereco.cep,
        uf: endereco.uf,
        lat: endereco.lat,
        lgt: endereco.lat,
        id_estacionamento: createEstacionamento.id,
      },
    }).catch(err => {
      throw new InternalServerErrorException("Erro ao inserir endereço" + err)
    })


    return { ...createEstacionamento, ...enderecoCreated };
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

  async findAll(): Promise<Estacionamento[]> {
    const foundEstacionamento: Estacionamento[] =
      await this.clientRepository.estacionamento.findMany({
        include: {
          Endereco: true
        }
      });

    if (!foundEstacionamento) {
      throw new InternalServerErrorException(
        `Não existe estacionamento cadastrado no banco`,
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
    estacionamento: Estacionamento,
    endereco: Endereco,
  ): Promise<Estacionamento> {
    // Atualiza o estacionamento
    const updatedEstacionamento: Estacionamento =
      await this.clientRepository.estacionamento.update({
        where: { id: id },
        data: estacionamento,

      });

    if (!updatedEstacionamento) {
      throw new InternalServerErrorException(
        `Não foi possível atualizar o estacionamento. id: ${id}`,
      );
    }

    // Atualiza o  endereço caso tenha atualização 
    const updateAddress = this.clientRepository.endereco.update({
      where: {
        id: estacionamento.endereco.id
      },
      data: {
        cidade: endereco.cidade,
        endereco: endereco.endereco,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cep: endereco.cep,
        uf: endereco.uf,
        lat: endereco.lat,
        lgt: endereco.lat,
      }
    })




    return { ...updatedEstacionamento, ...updateAddress };
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

    //Deleta na tabela de enderenço do estacionamento
    await this.clientRepository.endereco.delete({
      where: {
        id: alreadyExists.endereco.id
      }
    }).catch(err => {
      console.error(err)
      throw new BadRequestException("Endereço e adminstiradores não encontardo!" + err)
    })

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


    //Deleta o estacionamento
    const deletedEstacionamento: Estacionamento =
      await this.clientRepository.estacionamento.delete({
        where: { id: id_est },
      });

    return deletedEstacionamento
  }
}
