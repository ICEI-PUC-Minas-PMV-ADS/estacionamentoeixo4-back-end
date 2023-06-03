import { Module } from '@nestjs/common';
import { AdministradorModule } from '@src/administrador/administrador.module';
import { AuthModule } from '@src/auth/auth.module';
import { AvaliacaoModule } from '@src/avaliacao/avaliacao.module';
import { ClienteModule } from '@src/cliente/cliente.module';
import { EstacionamentoModule } from '@src/estacionamento/estacionamento.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ReservaModule } from '@src/reserva/reserva.module';
import { VeiculoModule } from '@src/veiculo/veiculo.module';

const routes = [
  AuthModule,
  ClienteModule,
  VeiculoModule,
  PrismaModule,
  EstacionamentoModule,
  AdministradorModule,
  ReservaModule,
  AvaliacaoModule,

];
@Module({
  imports: [...routes],
  exports: [...routes],
})
export class RouterModule { }
