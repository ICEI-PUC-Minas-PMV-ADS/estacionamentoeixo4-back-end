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
import { ManagerService } from "@src/manager/services/manager.service";

const BASE_URL = () => `http://localhost:${process.env.PORT}/api_producer/cliente`

describe('ClienteControler', () => {
    let service: AuthService
    let controller: AuthController
    let app: INestApplication
    let clienteService: ClienteService
    let managerService: ManagerService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
    managerService = module.get<ManagerService>(ManagerService)
   
    app = module.createNestApplication();

    await app.init()
  });

    afterAll(async () => {
        await app.close()
    })

    it('Deve criar cliente', async () => {

      const cpf = `${Math.random().toString().substring(5, 8)}44433322`
      const email = `teste.${Math.random().toString().substring(5, 9)}@fulano.com`   
      const uuid_firebase = `${cpf}teste`

      const createBody: CreateClienteDto = {
        name: "Apenas Fulano",
        email,
        cpf,
        uuid_firebase
      }

      const response = await axios.post(`${BASE_URL()}`, createBody).then(res => res.data)

      expect(response['id']).toBeTruthy()
      expect(response['name']).toBeTruthy()
      expect(response['email']).toBeTruthy()
      expect(response['createdAt']).toBeTruthy()
      expect(response['updatedAt']).toBeTruthy()

      await axios.delete(`${BASE_URL()}/${response?.id}`)
    })
})