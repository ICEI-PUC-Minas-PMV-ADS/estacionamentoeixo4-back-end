import { Decimal } from '@prisma/client/runtime';
import EstacionamentoAndAdministradores from './EstacioanmentoAndAdmsinstradores';
import { Endereco } from './Endereco';

export default class Estacionamento {
  id?: number;
  preco: number | Decimal;
  vagas_preferenciais: number;
  vagas_gerais: number;
  razao_social: string;
  cnpj: string;
  createdAt?: Date;
  updatedAt?: Date;
  EstacionamentoAndAdministradores?: EstacionamentoAndAdministradores[]
  endereco?: Endereco
}
