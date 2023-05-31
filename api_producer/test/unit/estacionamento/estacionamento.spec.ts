import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateClienteDto } from '@src/cliente/dto/create-cliente.dto';
import { EstacionamentoService } from '@src/estacionamento/estacionamento.service';
import { EstacionamentoController } from '@src/estacionamento/estacionamento.controller';
import { CreateEstacionamentoDto } from '@src/estacionamento/dto/create-estacionamento.dto';
import { Estacionamento, Prisma } from '@prisma/client';

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
    const createEstacionamentoMock: CreateEstacionamentoDto = {
      preco: 55,
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457"
    }

    const createEstacionamentoResponse: Estacionamento = {
      id: 1,
      preco: new Prisma.Decimal(55),
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(createEstacionamentoResponse))

    const response = await service.create(createEstacionamentoMock, createEstacionamentoResponse.id)

    expect(response?.createdAt).toBeTruthy()
    expect(response?.updatedAt).toBeTruthy()
    expect(response.toString()).toContain(createEstacionamentoMock.toString())
  })

  it('Deve encontrar um estacionamento específico', async () => {
    const idAsParams = 1

    const createdEstacionamentoResponse: Estacionamento = {
      id: 1,
      preco: new Prisma.Decimal(55),
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

    const updateEstacionamentoMock: CreateEstacionamentoDto = {
      preco: 55,
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457"
    }

    const updateEstacionamentoResponse: Estacionamento = {
      id: 1,
      preco: new Prisma.Decimal(55),
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'updateOne').mockImplementation(() => Promise.resolve(updateEstacionamentoResponse))

    const response = await service.updateOne(idAsParams, updateEstacionamentoMock)

    expect(response?.createdAt).toBeTruthy()
    expect(response?.updatedAt).toBeTruthy()
    expect(response.toString()).toContain(updateEstacionamentoMock.toString())
  })

  it('Deve remover um estacionamento', async () => {
    const idAsParams = 1

    const updateEstacionamentoResponse: Estacionamento = {
      id: 1,
      preco: new Prisma.Decimal(55),
      vagas_preferenciais: 10,
      vagas_gerais: 30,
      razao_social: "TESTE INC",
      cnpj: "12145856985457",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'removeOne').mockImplementation(() => Promise.resolve(updateEstacionamentoResponse))

    const response = await service.removeOne(idAsParams)

    expect(response).toMatchObject(updateEstacionamentoResponse)
  })

});
