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
import { EstacionamentoService } from "@src/estacionamento/estacionamento.service";
import { VeiculoService } from "@src/veiculo/veiculo.service";
import { CreateVeiculoDto } from "@src/veiculo/dto/create-veiculo.dto";
import { ClienteController } from "@src/cliente/cliente.controller";
import { AdministadorService } from "@src/administrador/services/administrador.service";
import { UpdateVeiculoDto } from "@src/veiculo/dto/update-veiculo.dto";

const delay = async (ms: number) => {
    return new Promise((resolve, _reject) => setTimeout(resolve, ms))
}

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
            imports: [AppModule]
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
        await delay(6000)
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

        const createdCliente = await request(app.getHttpServer())
            .post(`/cliente`)
            .send(createCliente)
            .then(res => res.body)
            .catch(e => console.error(e))

        const createVeiculoBody: CreateVeiculoDto = {
            placa,
            modelo,
            id_cliente: +createdCliente?.id,
            tipo: "Carro"
        }

        const createVeiculo = await request(app.getHttpServer())
            .post(`/veiculo`)
            .send(createVeiculoBody)
            .then(res => res.body)
            .catch(e => console.error(e))
        console.log('CREATE', createVeiculo)
        expect(createVeiculo['id']).toBeTruthy()
        expect(createVeiculo['placa']).toBeTruthy()
        expect(createVeiculo['modelo']).toBeTruthy()
        expect(createVeiculo['id_cliente']).toBeTruthy()
        expect(createVeiculo['createdAt']).toBeTruthy()
        expect(createVeiculo['updatedAt']).toBeTruthy()

        const readVeiculo = await request(app.getHttpServer())
            .get(`/veiculo/${createVeiculo["id"]}`)
            .then(res => res.body)
            .catch(e => console.error(e))
        console.log("READ", readVeiculo)
        expect(readVeiculo['id']).toBeTruthy()

        const updateVeiculoBody: UpdateVeiculoDto = {
            placa,
            tipo: "Moto",
            modelo,
            id_cliente: +createdCliente?.id
        }

        const updateVeiculo = await request(app.getHttpServer())
            .patch(`/veiculo/${createVeiculo["id"]}`)
            .send(updateVeiculoBody)
            .then(res => res.body)
            .catch(e => console.error(e))
        console.log("UPDATE", updateVeiculo)
        expect(createVeiculo["tipo"]).not.toBe(updateVeiculo["tipo"])

        const deleteVeiculo = await request(app.getHttpServer())
            .delete(`/veiculo/${createVeiculo["id"]}`)
            .then(res => res.body)
            .catch(e => console.error(e))
        console.log("DELETE", deleteVeiculo)
        const tryToReadVeiculo = await request(app.getHttpServer())
            .get(`/veiculo/${createVeiculo["id"]}`)
            .then(res => res.body)
            .catch(e => console.error(e))
        expect(tryToReadVeiculo["id"]).toBeFalsy()

        await request(app.getHttpServer())
            .get(`/cliente/${createdCliente["id"]}`)
            .then(res => res.body)
            .catch(e => console.error(e))
    })
})