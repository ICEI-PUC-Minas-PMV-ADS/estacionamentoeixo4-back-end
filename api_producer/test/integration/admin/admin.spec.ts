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
import { CreateManagerDto } from "@src/manager/dto/create-manager.dto";
import { VeiculoService } from "@src/veiculo/veiculo.service";

const BASE_URL = (uri: string = "", route: string = "manager") => `http://localhost:${process.env.PORT}/api_producer/${route}/${uri}`

describe('ManagerControler', () => {
    let service: AuthService
    let controller: AuthController
    let app: INestApplication
    let managerService: ManagerService
    let estacionamentoService: EstacionamentoService

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EstacionamentoService,
                VeiculoService,
                ManagerService,
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
        managerService = module.get<ManagerService>(ManagerService)
        estacionamentoService = module.get<EstacionamentoService>(EstacionamentoService)

        app = module.createNestApplication();

        await app.init()
    });

    afterAll(async () => {
        await app.close()
    })

    it('Deve criar admin', async () => {

        const createEstacionamentoBody: CreateEstacionamentoDto = {
            preco: new Prisma.Decimal(55),
            vagas_gerais: 12,
            vagas_preferenciais: 12,
            razao_social: "Fulano INC 5555555",
            cnpj: "44667678912305"
        }

        const createEstacionamento = await axios.post(`${BASE_URL("criar", "estacionamento")}`, createEstacionamentoBody).then(res => res.data)

        const createBody: CreateManagerDto = {
            nome: "Apenas Fulano",
            email: "testando123@fulano.com",
            id_estacionamento: createEstacionamento?.id
        }

        const response = await axios.post(`${BASE_URL()}`, createBody).then(res => res.data)

        expect(response["id"]).toBeTruthy()
        expect(response["createdAt"]).toBeTruthy()
        expect(response["updatedAt"]).toBeTruthy()
        expect(response["nome"]).toBeTruthy()
        expect(response["email"]).toBeTruthy()

        await axios.delete(`${BASE_URL("deletar", "estacionamento")}/${createEstacionamento?.id}`)
        await axios.delete(`${BASE_URL()}${response?.id}`)

    })
})