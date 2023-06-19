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
import { EstacionamentoService } from "@src/estacionamento/estacionamento.service";
import { CreateEstacionamentoDto } from "@src/estacionamento/dto/create-estacionamento.dto";
import { AdministadorService } from "@src/administrador/services/administrador.service";
import { CreateManagerDto } from "@src/administrador/dto/create-manager.dto";
import { UpdateEstacionamentoDto } from "@src/estacionamento/dto/update-estacionamento.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

const delay = async (ms: number) => {
  return new Promise((resolve, _reject) => setTimeout(resolve, ms))
}

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
      imports: [AppModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    estacionamentoService = module.get<EstacionamentoService>(EstacionamentoService)

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await delay(6000)
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

    const createAdmin = await request(app.getHttpServer())
      .post(`/administrador`)
      .send(createAdminBody)
      .then(res => res.body)
      .catch(e => console.error(e))

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

    const createEstacionamento = await request(app.getHttpServer())
    .post(`/estacionamento/${createAdmin["id"]}`)
    .send(createBody)
    .then(res => res.body)
    .catch(e => console.error(e))
    console.log("CREATE", createEstacionamento)
    expect(createEstacionamento["id"]).toBeTruthy()
    expect(createEstacionamento["preco"]).toBeTruthy()
    expect(createEstacionamento["vagas_preferenciais"]).toBeTruthy()
    expect(createEstacionamento["vagas_gerais"]).toBeTruthy()
    expect(createEstacionamento["razao_social"]).toBeTruthy()
    expect(createEstacionamento["cnpj"]).toBeTruthy()
    expect(createEstacionamento["createdAt"]).toBeTruthy()
    expect(createEstacionamento["updatedAt"]).toBeTruthy()

    const readEstacionamento = await request(app.getHttpServer())
    .get(`/estacionamento/${createEstacionamento["id_estacionamento"]}`)
    .then(res => res.body)
    .catch(e => console.error(e))
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

    const updateEstacionamento = await request(app.getHttpServer())
    .patch(`/estacionamento/atualizar/${createEstacionamento["id_estacionamento"]}`)
    .send(updateBody)
    .then(res => res.body)
    .catch(e => console.error(e))
    console.log("UPDATE", updateEstacionamento)
    expect(updateEstacionamento["razao_social"]).not.toBe(createEstacionamento["razao_social"])

    const deleteEstacionamento = await request(app.getHttpServer())
    .delete(`/estacionamento/deletar/${createEstacionamento['id_estacionamento']}/${createAdmin["id"]}`)
    .then(res => res.body)
    .catch(e => console.error(e))
    console.log('DELETE', deleteEstacionamento)
    const tryToReadEstacionamento = await request(app.getHttpServer())
    .get(`/estacionamento/${createEstacionamento["id_estacionamento"]}`)
    .then(res => res.body)
    .catch(() => null)
    expect(tryToReadEstacionamento["id"]).toBeFalsy()

    await request(app.getHttpServer())
    .delete(`/administrador/${createAdmin["id"]}`)
    .then(res => res.body)
    .catch(e => console.error(e))
  })
})