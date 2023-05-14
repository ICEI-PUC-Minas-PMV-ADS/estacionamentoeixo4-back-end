import { Prisma } from '@prisma/client';
export declare class CreateEstacionamentoDto {
    preco: Prisma.Decimal;
    vagas_preferenciais: number;
    vagas_gerais: number;
    razao_social: string;
    cnpj: string;
}
