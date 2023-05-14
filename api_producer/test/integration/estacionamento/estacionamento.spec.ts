import { CACHE_MANAGER, INestApplication } from "@nestjs/common";
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
import { ManagerService } from "@src/manager/services/manager.service";

const BASE_URL = (uri: string = "") => `http://localhost:${process.env.PORT}/api_producer/estacionamento/${uri}`

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
        ManagerService,
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

    await app.init()
  });

    afterAll(async () => {
        await app.close()
    })

    it('Deve criar estacionamento', async () => {

      const createBody: CreateEstacionamentoDto = {
        preco: new Prisma.Decimal(55),
        vagas_gerais: 12,
        vagas_preferenciais: 12,
        razao_social: "Fulano INC",
        cnpj: "30945678912399"
      }

      const response = await axios.post(`${BASE_URL("criar")}`, createBody).then(res => res.data)

      expect(response["id"]).toBeTruthy()
      expect(response["preco"]).toBeTruthy()
      expect(response["vagas_preferenciais"]).toBeTruthy()
      expect(response["vagas_gerais"]).toBeTruthy()
      expect(response["razao_social"]).toBeTruthy()
      expect(response["id"]).toBeTruthy()
      expect(response["cnpj"]).toBeTruthy()
      expect(response["createdAt"]).toBeTruthy()
      expect(response["updatedAt"]).toBeTruthy()


      await axios.delete(`${BASE_URL("deletar")}/${response?.id}`)
    })
})