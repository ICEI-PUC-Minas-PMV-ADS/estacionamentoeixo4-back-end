import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { Administrador } from '@prisma/client';
import { CreateManagerDto } from '@src/manager/dto/create-manager.dto';
import { AdministadorService } from '@src/manager/services/manager.service';

fdescribe('Testes unitários - Administradores', () => {
  let service: AdministadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdministadorService,
        PrismaService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = await module.get<AdministadorService>(AdministadorService);
  });

  it('Deve criar um administrador', async () => {
    const createAdministradorMock: CreateManagerDto = {
      nome: 'JhonDoezinho',
      email: 'jhondoezinho@email.com',
      uuid_firebase: 'asdasdsaasd545445',
    };

    const createAdministradorResponse: Administrador = {
      id: 1,
      nome: 'JhonDoezinho',
      email: 'jhondoezinho@email.com',
      createdAt: new Date(),
      uuid_firebase: 'asdasdsaasd545445',
      updatedAt: new Date(),
    };

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(createAdministradorResponse));

    const response = await service.create(createAdministradorMock);

    expect(response?.createdAt).toBeTruthy();
    expect(response?.updatedAt).toBeTruthy();
    expect(response.toString()).toContain(createAdministradorMock.toString());
  });

  it('Deve encontrar todos os administradores', async () => {
    const createAdministradorResponse: any[] = [
      {
        id: 1,
        nome: 'JhonDoezinho1',
        email: 'jhondoezinho@email1.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nome: 'JhonDoezinho2',
        email: 'jhondoezinho@email2.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nome: 'JhonDoezinho3',
        email: 'jhondoezinho3@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest
      .spyOn(service, 'getAll')
      .mockImplementation(() => Promise.resolve(createAdministradorResponse));

    const response = await service.getAll();

    expect(Array.isArray(response)).toBeTruthy();
    expect(response.length).toBe(3);
  });

  it('Deve atualizar um administrador', async () => {
    const idAsParams = 1;

    const updateAdministradorMock: CreateManagerDto = {
      nome: 'JhonDoezinho',
      email: 'jhondoezinho@email.com',
      uuid_firebase: 'sdaasdsaasdasdasd1545',
    };

    const updateAdministradorResponse: Administrador = {
      id: 1,
      nome: 'JhonDoezinho',
      email: 'jhondoezinho@email.com',
      uuid_firebase: 'asdasdsaasd545445',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve(updateAdministradorResponse));

    const response = await service.update(idAsParams, updateAdministradorMock);

    expect(response).toMatchObject(updateAdministradorResponse);
  });

  it('Deve remover um administrador', async () => {
    const idAsParams = 1;

    const removeAdministradorResponse: Administrador = {
      id: 1,
      nome: 'JhonDoezinho',
      email: 'jhondoezinho@email.com',
      createdAt: new Date(),
      uuid_firebase: 'asdasdsaasd545445',
      updatedAt: new Date(),
    };

    jest
      .spyOn(service, 'remove')
      .mockImplementation(() => Promise.resolve(removeAdministradorResponse));

    const response = await service.remove(idAsParams);

    expect(response).toMatchObject(removeAdministradorResponse);
  });
});
