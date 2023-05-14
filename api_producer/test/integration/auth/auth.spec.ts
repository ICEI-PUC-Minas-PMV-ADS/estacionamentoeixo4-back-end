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
import { ClienteController } from "@src/cliente/cliente.controller";
import * as util from "util"
import { ManagerService } from "@src/manager/services/manager.service";

const BASE_URL = (uri: string) => `http://localhost:${process.env.PORT}/api_producer/auth/${uri}`

describe('AuthControler', () => {
    let service: AuthService
    let controller: AuthController
    let app: INestApplication
    let clienteService: ClienteService
    let clienteControler: ClienteController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteController,
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
    clienteService = module.get<ClienteService>(ClienteService)
    clienteControler = module.get<ClienteController>(ClienteController)
   
    app = module.createNestApplication();

    await app.init()
  });

    afterAll(async () => {
        await app.close()
    })

    it('Deve retornar um objeto com accessToken e refreshToken', async () => {

      const cpf = `${Math.random().toString().substring(5, 8)}44433322`
      const email = `teste.${Math.random().toString().substring(5, 9)}@fulano.com`   
      const uuid_firebase = `${cpf}teste`

      const clienteData: CreateClienteDto = {
        name: "Apenas Fulano",
        email,
        cpf,
        uuid_firebase
      }

      const cliente = await clienteService.create(clienteData)

      const meData: AuthDTO = {
        email,
        uuid_firebase
      }

      const response = await axios.post(`${BASE_URL("me")}`, meData).then(res => res.data)

      expect(response['accessToken']).toBeTruthy()
      expect(response['refreshToken']).toBeTruthy()

      await axios.delete(`http://localhost:${process.env.PORT}/api_producer/cliente/${cliente?.id}`)
      
    })
})