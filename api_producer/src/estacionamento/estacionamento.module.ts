import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { EstacionamentoController } from './estacionamento.controller';
import { EstacionamentoService } from './estacionamento.service';

@Module({
  imports: [],
  controllers: [EstacionamentoController],
  providers: [EstacionamentoService, PrismaService],
})
export class EstacionamentoModule {}
