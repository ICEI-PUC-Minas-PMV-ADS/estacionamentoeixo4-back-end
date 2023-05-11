import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { VeiculoService } from '@src/veiculo/veiculo.service';
import { VeiculoController } from '@src/veiculo/veiculo.controller';
import { CreateVeiculoDto } from '@src/veiculo/dto/create-veiculo.dto';
import { Veiculo } from '@prisma/client';

fdescribe('Testes unitários - Veículos', () => {
  let service: VeiculoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculoController],
      providers: [
        VeiculoService,
        PrismaService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = await module.get<VeiculoService>(VeiculoService);
  });

  it('Deve criar um veículo', async () => {
    const createVeiculoMock: CreateVeiculoDto = {
      placa: "oab-xb33",
      modelo: "Fox Volkswagen",
      id_cliente: 2
    }

    const createVeiculoResponse: Veiculo = {
      id: 1,
      placa: "oab-xb33",
      modelo: "Fox Volkswagen",
      id_cliente: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(createVeiculoResponse))

    const response = await service.create(createVeiculoMock)

    expect(response?.createdAt).toBeTruthy()
    expect(response?.updatedAt).toBeTruthy()
    expect(response.toString()).toContain(createVeiculoMock.toString())
  })

  it('Deve encontrar todos os veículos', async () => {

    const allCreatedVeiculos: Veiculo[] = [
      {
        id: 1,
        placa: "oab-xb33",
        modelo: "Modelo 1",
        id_cliente: 44,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        placa: "abc-xb44",
        modelo: "Modelo 2",
        id_cliente: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        placa: "def-xb55",
        modelo: "Modelo 3",
        id_cliente: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(allCreatedVeiculos))

    const response = await service.findAll()

    expect(Array.isArray(response)).toBeTruthy()
    expect(response.length).toBe(3)
  })

  it('Deve encontrar um veículo em específico', async () => {
    const idAsParams = 1
    
    const createVeiculoResponse: Veiculo = {
      id: 1,
      placa: "oab-xb33",
      modelo: "Fox Volkswagen",
      id_cliente: 33,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(createVeiculoResponse))

    const response = await service.findOne(idAsParams)

    expect(response).toMatchObject(createVeiculoResponse)
  })

  it('Deve atualizar um veículo', async () => {
    const idAsParams = 1
    
    const updateVeiculoMock: CreateVeiculoDto = {
      placa: "oab-xb33",
      modelo: "Fox Volkswagen",
      id_cliente: 2
    }

    const updateVeiculoResponse: Veiculo = {
      id: 1,
      placa: "oab-xb33",
      modelo: "Fox Volkswagen",
      id_cliente: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(updateVeiculoResponse))

    const response = await service.update(idAsParams, updateVeiculoMock)

    expect(response?.createdAt).toBeTruthy()
    expect(response?.updatedAt).toBeTruthy()
    expect(response.toString()).toContain(updateVeiculoMock.toString())
  })

  it('Deve remover um veículo', async () => {
    const idAsParams = 1

    const deletedVeiculoResponse: Veiculo = {
      id: 1,
      placa: "oab-xb33",
      modelo: "Fox Volkswagen",
      id_cliente: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(deletedVeiculoResponse))

    const response = await service.remove(idAsParams)

    expect(response).toMatchObject(deletedVeiculoResponse)
  })


});
