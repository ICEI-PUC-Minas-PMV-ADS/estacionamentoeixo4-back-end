import { Module } from '@nestjs/common';
import { ManagerService } from '../manager/services/manager.service';
import { ManagerController } from '../manager/controllers/manager.controller';
import { PrismaService } from '@src/prisma/prisma.service';
import { ManagerMapper } from './mapper/manager.mapper';

@Module({
  imports: [],
  controllers: [ManagerController],
  providers: [ManagerService, PrismaService, ManagerMapper],
})
export class ManagerModule {}
