import { Prisma } from '@prisma/client';
import EstacionamentoAndAdministradores from './EstacioanmentoAndAdmsinstradores';

export default class Estacionamento {
  id: number;
  preco: Prisma.Decimal;
  vagas_preferenciais: number;
  vagas_gerais: number;
  razao_social: string;
  cnpj: string;
  createdAt: Date;
  updatedAt: Date;
  administradores?: EstacionamentoAndAdministradores[];
}
