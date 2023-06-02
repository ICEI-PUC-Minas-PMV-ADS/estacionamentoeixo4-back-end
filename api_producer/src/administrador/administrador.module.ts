import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { ManagerMapper } from './mapper/manager.mapper';
import { AdministradorController } from './controllers/administrador.controller';
import { AdministadorService } from './services/administrador.service';

@Module({
  imports: [],
  controllers: [AdministradorController],
  providers: [AdministadorService, PrismaService, ManagerMapper],
})
export class AdministradorModule {}
