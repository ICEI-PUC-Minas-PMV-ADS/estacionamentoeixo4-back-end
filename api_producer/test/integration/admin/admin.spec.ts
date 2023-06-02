import { INestApplication } from "@nestjs/common";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
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
import {AdministadorService} from "@src/administrador/services/administrador.service";
import {CreateManagerDto} from "@src/administrador/dto/create-manager.dto";
import { VeiculoService } from "@src/veiculo/veiculo.service";
import { RedisModule } from '../../../redis/redis.module';
import {UpdateManagerDto} from "@src/administrador/dto/update-manager.dto";

const BASE_URL = (uri: string = "", route: string = "administrador") => `http://localhost:${process.env.PORT}/api_producer/${route}/${uri}`

describe('ManagerControler', () => {
    let service: AuthService
    let controller: AuthController
    let app: INestApplication
    let managerService: AdministadorService
    let estacionamentoService: EstacionamentoService

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EstacionamentoService,
                VeiculoService,
                AdministadorService,
                JwtService,
                { provide: CACHE_MANAGER, useValue: {} },
                ConfigService,
                AuthService,
                AuthController,
                PrismaService,
                ClienteService,
                AppModule,
                RedisModule
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        controller = module.get<AuthController>(AuthController);
        managerService = module.get<AdministadorService>(AdministadorService)
        estacionamentoService = module.get<EstacionamentoService>(EstacionamentoService)

        app = module.createNestApplication();

        await app.init()

    });

    afterAll(async () => {
        await app.close()
    })

    it('Deve criar admin', async () => {

        const cnpj = `${Math.random().toString().substring(5, 8)}44433322111`
        const email = `teste.${Math.random().toString().substring(5, 10)}@fulano.com`
        const uuid_firebase = `${cnpj}teste`

        const createBody: CreateManagerDto = {
            nome: "Apenas Fulano",
            email,
            uuid_firebase
        }

        const createAdmin = await axios.post(`${BASE_URL()}`, createBody).then(res => res.data)
        console.log("CREATE", createAdmin)
        expect(createAdmin["id"]).toBeTruthy()
        expect(createAdmin["createdAt"]).toBeTruthy()
        expect(createAdmin["updatedAt"]).toBeTruthy()
        expect(createAdmin["nome"]).toBeTruthy()
        expect(createAdmin["email"]).toBeTruthy()

        const readAdmin = await axios.get(`${BASE_URL()}${createAdmin?.id}`).then(res => res.data)
        console.log("READ", createAdmin)
        expect(readAdmin["id"]).toBeTruthy()

        const updateBody: UpdateManagerDto = { nome: "Fulano Atualizado", email }
        const updateAdmin = await axios.patch(`${BASE_URL()}${createAdmin?.id}`, updateBody).then(res => res.data)
        console.log("UPDATE", updateAdmin)
        expect(createAdmin["nome"]).not.toBe(updateAdmin["nome"])

        const deleteAdmin = await axios.delete(`${BASE_URL()}${createAdmin?.id}`).then(res => res.data)
        console.log("DELETE", deleteAdmin)
        const tryToReadDeletedAdmin = await axios.get(`${BASE_URL()}${createAdmin?.id}`).then(res => res.data).catch(e => e)
        expect(tryToReadDeletedAdmin["id"]).toBeFalsy()

    })
})