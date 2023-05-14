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
import { CreateVeiculoDto } from "@src/veiculo/dto/create-veiculo.dto";
import { ClienteController } from "@src/cliente/cliente.controller";

const BASE_URL = (uri: string = "", route: string = "veiculo") => `http://localhost:${process.env.PORT}/api_producer/${route}/${uri}`

describe('ManagerControler', () => {
    let service: AuthService
    let controller: AuthController
    let app: INestApplication
    let managerService: ManagerService
    let estacionamentoService: EstacionamentoService
    let veiculoService: VeiculoService
    let clienteService: ClienteService

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VeiculoService,
                EstacionamentoService,
                ManagerService,
                ClienteService,
                ClienteController,
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
        veiculoService = module.get<VeiculoService>(VeiculoService)
        clienteService = module.get<ClienteService>(ClienteService)

        app = module.createNestApplication();

        await app.init()
    });

    afterAll(async () => {
        await app.close()
    })

    it('Deve criar veiculo', async () => {

        const createCliente: CreateClienteDto = {
            name: "Apenas Fulano",
            email: `teste.teste.${new Date().getMilliseconds()}@fulano.com`,
            cpf: `${Math.random().toString().substring(5, 8)}00055588`
        }

        const createdCliente = await axios.post(`http://localhost:${process.env.PORT}/api_producer/cliente`
        , createCliente).then(res => res.data)

        const createVeiculo: CreateVeiculoDto = {
            placa: `pkj${Math.random().toString().substring(5, 9)}`,
            modelo: `modelo pkj${Math.random().toString().substring(5, 9)}`,
            id_cliente: +createdCliente?.id
        }

        const response = await axios.post(`http://localhost:${process.env.PORT}/api_producer/veiculo`, createVeiculo).then(res => res.data).catch(e => console.error('AQUI :::::::::::::', util.inspect(e, false, null, true)))

        expect(response['id']).toBeTruthy()
        expect(response['placa']).toBeTruthy()
        expect(response['modelo']).toBeTruthy()
        expect(response['id_cliente']).toBeTruthy()
        expect(response['createdAt']).toBeTruthy()
        expect(response['updatedAt']).toBeTruthy()

        await axios.delete(`http://localhost:${process.env.PORT}/api_producer/veiculo/${response?.id}`)

        await axios.delete(`http://localhost:${process.env.PORT}/api_producer/cliente/${createdCliente?.id}`)
    })
})