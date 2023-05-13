import { CreateEstacionamentoDto } from './create-estacionamento.dto';
declare const UpdateEstacionamentoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEstacionamentoDto>>;
export declare class UpdateEstacionamentoDto extends UpdateEstacionamentoDto_base {
    preco: number;
    vagas_preferenciais: number;
    vagas_gerais: number;
    razao_social: string;
    cnpj: string;
}
export {};
