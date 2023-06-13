import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "@src/app.module";
import { AuthController } from "@src/auth/auth.controller";
import { AuthService } from "@src/auth/auth.service";
import { ClienteService } from "@src/cliente/cliente.service";
import { PrismaService } from "@src/prisma/prisma.service";
import * as request from 'supertest';
import axios from 'axios';
import { AuthDTO } from "@src/auth/dto/me.input";
import { CreateClienteDto } from "@src/cliente/dto/create-cliente.dto";
import * as util from "util"
import { EstacionamentoService } from "@src/estacionamento/estacionamento.service";
import { CreateEstacionamentoDto } from "@src/estacionamento/dto/create-estacionamento.dto";
import { Prisma } from "@prisma/client";
import { Estacionamento } from "@prisma/client";
import { AdministadorService } from "@src/administrador/services/administrador.service";
import { CreateManagerDto } from "@src/administrador/dto/create-manager.dto";
import { UpdateEstacionamentoDto } from "@src/estacionamento/dto/update-estacionamento.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
const BASE_URL = () => `http://localhost:${process.env.PORT}/api_producer/estacionamento`

describe('EstacionamentoControler', () => {
  let service: AuthService
  let controller: AuthController
  let app: INestApplication
  let estacionamentoService: EstacionamentoService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstacionamentoService,
        ClienteService,
        AdministadorService,
        JwtService,
        { provide: CACHE_MANAGER, useValue: {} },
        ConfigService,
        AuthService,
        AuthController,
        PrismaService,
        AppModule
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    estacionamentoService = module.get<EstacionamentoService>(EstacionamentoService)

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('Deve criar estacionamento', async () => {

    const cnpj = `${Math.random().toString().substring(5, 8)}44433322000`
    const email = `teste.${Math.random().toString().substring(5, 10)}@fulano.com`
    const uuid_firebase = `${cnpj}teste`

    const createAdminBody: CreateManagerDto = {
      nome: "Apenas Fulano",
      email,
      uuid_firebase
    }

    const createAdmin = await axios.post(`http://localhost:${process.env.PORT}/api_producer/administrador`, createAdminBody).then(res => res.data)

    const createBody: CreateEstacionamentoDto = {
      preco: 55,
      vagas_gerais: 12,
      vagas_preferenciais: 12,
      razao_social: "Fulano INC",
      cnpj,
      bairro: "Nova York",
      cep: 1231288,
      cidade: "California",
      endereco: "São bernado",
      lat: -12124124.1241245,
      lgt: 12124124.1241245,
      numero: 12,
      uf: "YK"

    }

    const createEstacionamento = await axios.post(`${BASE_URL()}/${createAdmin["id"]}`, createBody).then(res => res.data)
    console.log("CREATE", createEstacionamento)
    expect(createEstacionamento["id"]).toBeTruthy()
    expect(createEstacionamento["preco"]).toBeTruthy()
    expect(createEstacionamento["vagas_preferenciais"]).toBeTruthy()
    expect(createEstacionamento["vagas_gerais"]).toBeTruthy()
    expect(createEstacionamento["razao_social"]).toBeTruthy()
    expect(createEstacionamento["cnpj"]).toBeTruthy()
    expect(createEstacionamento["createdAt"]).toBeTruthy()
    expect(createEstacionamento["updatedAt"]).toBeTruthy()

    const readEstacionamento = await axios.get(`${BASE_URL()}/${createEstacionamento["id_estacionamento"]}`).then(res => res.data)
    console.log("READ", readEstacionamento)
    expect(readEstacionamento["id"]).toBeTruthy()

    const updateBody: UpdateEstacionamentoDto = {
      preco: createBody.preco,
      vagas_gerais: createBody.vagas_gerais,
      vagas_preferenciais: createBody.vagas_preferenciais,
      razao_social: "Fulano Atualizazo INC",
      cnpj,
      bairro: "Nova York",
      cep: 1231288,
      cidade: "California",
      endereco: "São bernado",
      lat: -12124124.1241245,
      lgt: 12124124.1241245,
      numero: 12,
      uf: "YK"
    }
    const updateEstacionamento = await axios.patch(`${BASE_URL()}/atualizar/${createEstacionamento["id_estacionamento"]}`, updateBody).then(res => res.data)
    console.log("UPDATE", updateEstacionamento)
    expect(updateEstacionamento["razao_social"]).not.toBe(createEstacionamento["razao_social"])

    const deleteEstacionamento = await axios.delete(`http://localhost:${process.env.PORT}/api_producer/estacionamento/deletar/${createEstacionamento['id_estacionamento']}/${createAdmin["id"]}`).then(res => res.data).catch(e => e)
    console.log('DELETE', deleteEstacionamento)
    const tryToReadEstacionamento = await axios.get(`${BASE_URL()}/encontrar/${createEstacionamento["id_estacionamento"]}`).then(res => res.data).catch(e => e)
    expect(tryToReadEstacionamento["id"]).toBeFalsy()

    await axios.delete(`http://localhost:${process.env.PORT}/api_producer/administrador/${createAdmin["id"]}`).then(res => res.data).catch(e => console.error(e))
  })
})