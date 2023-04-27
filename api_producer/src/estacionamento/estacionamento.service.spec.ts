import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/common';
import { EstacionamentoService } from './estacionamento.service';

describe('EstacionamentoService', () => {
  let service: EstacionamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstacionamentoService,
        PrismaService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = module.get<EstacionamentoService>(EstacionamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
