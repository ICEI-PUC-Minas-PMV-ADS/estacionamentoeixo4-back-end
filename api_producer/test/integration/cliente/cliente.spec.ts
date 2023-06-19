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
import { CreateClienteDto } from "@src/cliente/dto/create-cliente.dto";
import {AdministadorService} from "@src/administrador/services/administrador.service";
import {UpdateClienteDto} from "@src/cliente/dto/update-client.dto";

const delay = async (ms: number) => {
  return new Promise((resolve, _reject) => setTimeout(resolve, ms))
}

describe('ClienteControler', () => {
    let service: AuthService
    let controller: AuthController
    let app: INestApplication
    let clienteService: ClienteService
    let managerService: AdministadorService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
      imports: [AppModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    clienteService = module.get<ClienteService>(ClienteService)
    managerService = module.get<AdministadorService>(AdministadorService)
   
    app = module.createNestApplication();

    await app.init()
  });

    afterAll(async () => {
        await delay(6000)
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

      const createCliente = await request(app.getHttpServer())
            .post(`/cliente`)
            .send(createBody)
            .then(res => res.body)
            .catch(e => console.error(e))
      //const createCliente = await axios.post(`${BASE_URL()}`, createBody).then(res => res.data)
      console.log("CREATE", createCliente)
      expect(createCliente['id']).toBeTruthy()
      expect(createCliente['name']).toBeTruthy()
      expect(createCliente['email']).toBeTruthy()
      expect(createCliente['createdAt']).toBeTruthy()
      expect(createCliente['updatedAt']).toBeTruthy()

      const readCliente = await request(app.getHttpServer())
            .get(`/cliente/${createCliente['id']}`)
            .then(res => res.body)
            .catch(e => console.error(e))
      //const readCliente = await axios.get(`${BASE_URL()}/${createCliente['id']}`).then(res => res.data).catch(e => console.error(e))
      console.log("READ", readCliente)
      expect(readCliente['id']).toBeTruthy()

      const updateBody: UpdateClienteDto = { name: "Fulano Atualizado", cpf, email }
      const updateCliente = await request(app.getHttpServer())
            .patch(`/cliente/${createCliente['id']}`)
            .send(updateBody)
            .then(res => res.body)
            .catch(e => console.error(e))
      //const updateCliente = await axios.patch(`${BASE_URL()}/${createCliente['id']}`, updateBody).then(res => res.data)
      console.log("UPDATE", updateCliente)
      expect(createCliente['name']).not.toBe(updateCliente['name'])

      const deleteCliente = await request(app.getHttpServer())
            .delete(`/cliente/${createCliente['id']}`)
            .then(res => res.body)
            .catch(e => console.error(e))
      //const deleteCliente = await axios.delete(`${BASE_URL()}/${createCliente?.id}`).then(res => res.data)
      console.log("DELETE", deleteCliente)
      const tryToReadDeletedCliente = await request(app.getHttpServer())
            .get(`/cliente/${createCliente['id']}`)
            .then(res => res.body)
            .catch(e => console.error(e))
      //const tryToReadDeletedCliente = await axios.get(`${BASE_URL()}/${createCliente['id']}`).then(res => res.data).catch(e => e)
      expect(tryToReadDeletedCliente["id"]).toBeFalsy()
    })
})