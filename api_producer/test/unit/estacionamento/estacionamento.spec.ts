import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateClienteDto } from '@src/cliente/dto/create-cliente.dto';
import { EstacionamentoService } from '@src/estacionamento/estacionamento.service';
import { EstacionamentoController } from '@src/estacionamento/estacionamento.controller';
import { CreateEstacionamentoDto } from '@src/estacionamento/dto/create-estacionamento.dto';
import { Endereco } from '@src/estacionamento/entity/Endereco';
import Estacionamento from '@src/estacionamento/entity/Estacionamento';
// import { Endereco, Estacionamento, Prisma } from '@prisma/client';

fdescribe('Testes unitários - Estacionamentos', () => {
  let service: EstacionamentoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstacionamentoController],
      providers: [
        EstacionamentoService,
        PrismaService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = await module.get<EstacionamentoService>(EstacionamentoService);
  });

  it('Deve criar um estacionamento', async () => {
    const endereco: Endereco[] = [{
      bairro: 'bairro',
      cep: 5425787,
      cidade: 'cidade',
      endereco: 'endereco',
      id: 1,
      id_estacionamento: 1,
      lat: 5656565656655,
      lgt: 8484844484844,
      numero: 1234,
      uf: "sp"
    }]

    const createEstacionamentoMock: Estacionamento = {
      preco: 55,
      vagas_preferenciais: 55,
      vagas_gerais: 55,
      razao_social: "razao_teste",
      cnpj: "12345678945612",
      endereco,
    }

    const createEstacionamentoResponse: Estacionamento = {
      id: 1,
      preco: 55,
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(createEstacionamentoResponse))

    const response = await service.create(createEstacionamentoMock, endereco[0], createEstacionamentoResponse.id)

    expect(response?.createdAt).toBeTruthy()
    expect(response?.updatedAt).toBeTruthy()
    expect(response.toString()).toContain(createEstacionamentoMock.toString())
  })

  it('Deve encontrar um estacionamento específico', async () => {
    const idAsParams = 1

    const createdEstacionamentoResponse: Estacionamento = {
      id: 1,
      preco: 55,
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(createdEstacionamentoResponse))

    const response = await service.findOne(idAsParams)

    expect(response).toMatchObject(createdEstacionamentoResponse)
  })

  it('Deve atualizar um estacionamento', async () => {
    const idAsParams = 1

    const endereco: Endereco[] = [{
      bairro: 'bairro',
      cep: 5425787,
      cidade: 'cidade',
      endereco: 'endereco',
      id: 1,
      id_estacionamento: 1,
      lat: 5656565656655,
      lgt: 8484844484844,
      numero: 1234,
      uf: "sp"
    }]

    const updateEstacionamentoMock: Estacionamento = {
      preco: 55,
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457"
    }

    const updateEstacionamentoResponse: Estacionamento = {
      id: 1,
      preco: 55,
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'updateOne').mockImplementation(() => Promise.resolve(updateEstacionamentoResponse))

    const response = await service.updateOne(idAsParams, updateEstacionamentoMock, endereco[0])

    expect(response?.createdAt).toBeTruthy()
    expect(response?.updatedAt).toBeTruthy()
    expect(response.toString()).toContain(updateEstacionamentoMock.toString())
  })

  it('Deve remover um estacionamento', async () => {
    const idAsParams = 1
    const idAsParams2 = 2

    const updateEstacionamentoResponse: Estacionamento = {
      id: 1,
      preco: 55,
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(updateEstacionamentoResponse))

    const response = await service.remove(idAsParams, idAsParams2)

    expect(response).toMatchObject(updateEstacionamentoResponse)
  })

});
