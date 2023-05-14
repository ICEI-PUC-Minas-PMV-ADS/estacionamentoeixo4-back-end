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

    it('Deve fazer retornar um objeto com accessToken e refreshToken', async () => {

      const clienteData: CreateClienteDto = {
        name: "Apenas Fulano",
        email: "teste.email.123@fulano.com",
        cpf: "55544433322"
      }

      const cliente = await clienteService.create(clienteData)

      const meData: AuthDTO = {
        id: 15454121,
        email: "teste.email.123@fulano.com"
      }

      const response = await axios.post(`${BASE_URL("me")}`, meData).then(res => res.data)

      expect(response['accessToken']).toBeTruthy()
      expect(response['refreshToken']).toBeTruthy()

      await axios.delete(`http://localhost:${process.env.PORT}/api_producer/cliente/${cliente?.id}`)
      
    })
})