import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { ClienteController } from '@src/cliente/cliente.controller';
import { ClienteService } from '@src/cliente/cliente.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { Cliente } from '@prisma/client';
import { CreateClienteDto } from '@src/cliente/dto/create-cliente.dto';
import { UpdateClienteDto } from '@src/cliente/dto/update-client.dto';

fdescribe('Testes unitários - Clientes', () => {
  let service: ClienteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        ClienteService,
        PrismaService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = await module.get<ClienteService>(ClienteService);
  });

  it('Deve criar um cliente', async () => {
    const createClienteMock: CreateClienteDto = {
      name: "JhonDoezinho",
      email: "doezinhosilva@email.com.br",
      cpf: "42022522210",
      uuid_firebase: "asddsaASDSDAASDDS5265"
    }

    const createClienteResponse = {
      id: 1,
      name: 'JhonDoezinho',
      email: 'doezinhosilva@email.com.br',
      cpf: '42022522210',
      uuid_firebase: "asdasdsaasd545445",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(createClienteResponse))

    const response = await service.create(createClienteMock)

    expect(response?.createdAt).toBeTruthy()
    expect(response?.updatedAt).toBeTruthy()
    expect(response.toString()).toContain(createClienteMock.toString())
  })

  it('Deve atualizar um cliente', async () => {
    const idAsParams = 1

    const updateClienteMock: UpdateClienteDto = {
      name: "JhonDoezinho",
      email: "doezinhosilva@email.com.br",
      cpf: "42022522210"
    }

    const updateClienteResponse = {
      id: 1,
      name: 'JhonDoezinho',
      email: 'doezinhosilva@email.com.br',
      cpf: '42022522210',
      uuid_firebase: "asdasdsaasd545445",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(updateClienteResponse))

    const response = await service.update(idAsParams, updateClienteMock)

    expect(response?.createdAt).toBeTruthy()
    expect(response?.updatedAt).toBeTruthy()
    expect(response.toString()).toContain(updateClienteMock.toString())
  })

  it('Deve encontrar todos os clientes', async () => {

    const createdClientesResponse: Cliente[] = [
      {
        id: 1,
        name: 'JhonDoezinho',
        email: 'doezinhosilva@email.com.br',
        cpf: '42022522210',
        createdAt: new Date(),
        uuid_firebase: "asdasdsaasd545445",
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'JhonDoezinho2',
        email: 'doezinhosilva2@email.com.br',
        uuid_firebase: "asdasdsaasd545445",
        cpf: '42022522222',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'JhonDoezinho3',
        email: 'doezinhosilva3@email.com.br',
        cpf: '42022522233',
        uuid_firebase: "asdasdsaasd545445",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(createdClientesResponse))

    const response = await service.findAll()

    expect(Array.isArray(response)).toBeTruthy()
    expect(response.length).toBe(3)
  })

  it('Deve encontrar o email de um cliente', async () => {

    const createdClientesResponse: Cliente = {
      id: 3,
      name: 'JhonDoezinho3',
      email: 'doezinhosilva3@email.com.br',
      cpf: '42022522233',
      createdAt: new Date(),
      uuid_firebase: "asdasdsaasd545445",
      updatedAt: new Date()
    }

    jest.spyOn(service, 'findEmail').mockImplementation(() => Promise.resolve(createdClientesResponse))

    const response = await service.findEmail(createdClientesResponse.email)

    expect(response.email).toBe(createdClientesResponse.email)
  })

  it('Deve encontrar um cliente específico', async () => {
    const idAsParams = 22

    const createdClientesResponse: Cliente = {
      id: 22,
      name: 'JhonDoezinho3',
      email: 'doezinhosilva3@email.com.br',
      uuid_firebase: "asdasdsaasd545445",
      cpf: '42022522233',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(createdClientesResponse))

    const response = await service.findOne(idAsParams)

    expect(response).toMatchObject(createdClientesResponse)
  })

  it('Deve remover um cliente específico', async () => {
    const idAsParams = 22

    const createdClientesResponse: Cliente = {
      id: 22,
      name: 'JhonDoezinho3',
      email: 'doezinhosilva3@email.com.br',
      uuid_firebase: "asdasdsaasd545445",
      cpf: '42022522233',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(createdClientesResponse))

    const response = await service.remove(idAsParams)

    expect(response).toMatchObject(createdClientesResponse)
  })


});
