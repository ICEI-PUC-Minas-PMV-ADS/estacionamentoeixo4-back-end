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
import { VeiculoService } from "@src/veiculo/veiculo.service";
import { CreateVeiculoDto } from "@src/veiculo/dto/create-veiculo.dto";
import { ClienteController } from "@src/cliente/cliente.controller";
import { AdministadorService } from "@src/administrador/services/administrador.service";
import { UpdateVeiculoDto } from "@src/veiculo/dto/update-veiculo.dto";

const BASE_URL = (uri: string = "", route: string = "veiculo") => `http://localhost:${process.env.PORT}/api_producer/${route}/${uri}`

describe('ManagerControler', () => {
    let service: AuthService
    let controller: AuthController
    let app: INestApplication
    let managerService: AdministadorService
    let estacionamentoService: EstacionamentoService
    let veiculoService: VeiculoService
    let clienteService: ClienteService

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VeiculoService,
                EstacionamentoService,
                AdministadorService,
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
        managerService = module.get<AdministadorService>(AdministadorService)
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

        const cpf = `${Math.random().toString().substring(5, 8)}44433322`
        const email = `teste.${Math.random().toString().substring(5, 9)}@fulano.com`
        const uuid_firebase = `${cpf}teste`

        const placa = `pkj${Math.random().toString().substring(5, 9)}`
        const modelo = `modelo pkj${Math.random().toString().substring(5, 9)}`

        const createCliente: CreateClienteDto = {
            name: "Apenas Fulano",
            email,
            cpf,
            uuid_firebase
        }

        const createdCliente = await axios.post(`http://localhost:${process.env.PORT}/api_producer/cliente`
            , createCliente).then(res => res.data)

        const createVeiculoBody: CreateVeiculoDto = {
            placa,
            modelo,
            id_cliente: +createdCliente?.id,
            tipo: "Carro"
        }

        const createVeiculo = await axios.post(`http://localhost:${process.env.PORT}/api_producer/veiculo`, createVeiculoBody).then(res => res.data)
        console.log('CREATE', createVeiculo)
        expect(createVeiculo['id']).toBeTruthy()
        expect(createVeiculo['placa']).toBeTruthy()
        expect(createVeiculo['modelo']).toBeTruthy()
        expect(createVeiculo['id_cliente']).toBeTruthy()
        expect(createVeiculo['createdAt']).toBeTruthy()
        expect(createVeiculo['updatedAt']).toBeTruthy()

        const readVeiculo = await axios.get(`http://localhost:${process.env.PORT}/api_producer/veiculo/${createVeiculo["id"]}`).then(res => res.data)
        console.log("READ", readVeiculo)
        expect(readVeiculo['id']).toBeTruthy()

        const updateVeiculoBody: UpdateVeiculoDto = {
            placa,
            tipo: "Moto",
            modelo,
            id_cliente: +createdCliente?.id
        }

        const updateVeiculo = await axios.patch(`http://localhost:${process.env.PORT}/api_producer/veiculo/${createVeiculo["id"]}`, updateVeiculoBody).then(res => res.data)
        console.log("UPDATE", updateVeiculo)
        expect(createVeiculo["tipo"]).not.toBe(updateVeiculo["tipo"])

        const deleteVeiculo = await axios.delete(`http://localhost:${process.env.PORT}/api_producer/veiculo/${createVeiculo?.id}`).then(res => res.data)
        console.log("DELETE", deleteVeiculo)
        const tryToReadVeiculo = await axios.get(`http://localhost:${process.env.PORT}/api_producer/veiculo/${createVeiculo["id"]}`).then(res => res.data).catch(e => e)
        expect(tryToReadVeiculo["id"]).toBeFalsy()

        await axios.delete(`http://localhost:${process.env.PORT}/api_producer/cliente/${createdCliente?.id}`)
    })
})