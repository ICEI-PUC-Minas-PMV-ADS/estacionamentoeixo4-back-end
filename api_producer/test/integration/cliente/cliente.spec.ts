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

const BASE_URL = () => `http://localhost:${process.env.PORT}/api_producer/cliente`

describe('ClienteControler', () => {
    let service: AuthService
    let controller: AuthController
    let app: INestApplication
    let clienteService: ClienteService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
   
    app = module.createNestApplication();

    await app.init()
  });

    afterAll(async () => {
        await app.close()
    })

    it('Deve criar cliente', async () => {

      const createBody: CreateClienteDto = {
        name: "Apenas Fulano",
        email: "fulano595959595959@fulano.com",
        cpf: "54922211100"

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