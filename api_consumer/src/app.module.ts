import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservaController } from './reserva/reserva.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ReservaService } from './reserva/reserva.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class AppModule { }
