import { CreateEstacionamentoDto } from "../dto/create-estacionamento.dto";
import { Endereco } from "../entity/Endereco";
import Estacionamento from "../entity/Estacionamento";

export class EstacionamentoMapper {
    mapCreateEstacionamentoDtoToCreateModel(
        dto: CreateEstacionamentoDto,
    ): Estacionamento {
        const createMapperEstacionamento = new Estacionamento();

        createMapperEstacionamento.preco = dto.preco
        createMapperEstacionamento.vagas_preferenciais = dto.vagas_preferenciais
        createMapperEstacionamento.vagas_gerais = dto.vagas_gerais
        createMapperEstacionamento.razao_social = dto.razao_social
        createMapperEstacionamento.cnpj = dto.cnpj
        return createMapperEstacionamento;
    }

    mapCreateAddressDtoToCreateModel(
        dto: CreateEstacionamentoDto,
    ): Endereco {
        const createMapperEndereco = new Endereco();

        createMapperEndereco.bairro = dto.bairro
        createMapperEndereco.cep = dto.cep
        createMapperEndereco.cidade = dto.cidade
        createMapperEndereco.endereco = dto.endereco
        createMapperEndereco.numero = dto.numero
        createMapperEndereco.uf = dto.uf
        createMapperEndereco.lat = dto.lat
        createMapperEndereco.lgt = dto.lgt
        return createMapperEndereco;
    }

    mapUpdateEstacionamentoDtoToCreateModel(
        dto: CreateEstacionamentoDto,
    ): Estacionamento {
        const createMapperEstacionamento = new Estacionamento();

        createMapperEstacionamento.preco = dto.preco
        createMapperEstacionamento.vagas_preferenciais = dto.vagas_preferenciais
        createMapperEstacionamento.vagas_gerais = dto.vagas_gerais
        createMapperEstacionamento.razao_social = dto.razao_social
        createMapperEstacionamento.cnpj = dto.cnpj
        return createMapperEstacionamento;
    }

    mapUpdateAddressDtoToCreateModel(
        dto: CreateEstacionamentoDto,
    ): Endereco {
        const createMapperEndereco = new Endereco();
        createMapperEndereco.bairro = dto.bairro
        createMapperEndereco.cep = dto.cep
        createMapperEndereco.cidade = dto.cidade
        createMapperEndereco.endereco = dto.endereco
        createMapperEndereco.lat = dto.lat
        createMapperEndereco.lgt = dto.lgt
        return createMapperEndereco;
    }


}