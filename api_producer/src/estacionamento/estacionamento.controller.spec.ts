import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EstacionamentoController } from './estacionamento.controller';
import { EstacionamentoService } from './estacionamento.service';

describe('EstacionamentoController', () => {
  let controller: EstacionamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstacionamentoController],
      providers: [
        EstacionamentoService,
        PrismaService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    controller = await module.get<EstacionamentoController>(
      EstacionamentoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
