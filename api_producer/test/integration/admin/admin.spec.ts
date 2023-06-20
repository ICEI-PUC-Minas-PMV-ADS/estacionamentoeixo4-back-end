import { INestApplication } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "@src/app.module";
import { AuthController } from "@src/auth/auth.controller";
import { AuthService } from "@src/auth/auth.service";
import { ClienteService } from "@src/cliente/cliente.service";
import { PrismaService } from "@src/prisma/prisma.service";
import * as request from 'supertest';
import { EstacionamentoService } from "@src/estacionamento/estacionamento.service";
import { AdministadorService } from "@src/administrador/services/administrador.service";
import { CreateManagerDto } from "@src/administrador/dto/create-manager.dto";
import { VeiculoService } from "@src/veiculo/veiculo.service";
import { RedisModule } from '../../../redis/redis.module';
import { UpdateManagerDto } from "@src/administrador/dto/update-manager.dto";

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
            imports: [AppModule]
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

        const createAdmin = await request(app.getHttpServer())
            .post(`/administrador`)
            .send(createBody)
            .then(res => res.body)
            .catch(e => console.error(e))
        console.log("CREATE", createAdmin)
        expect(createAdmin["id"]).toBeTruthy()
        expect(createAdmin["createdAt"]).toBeTruthy()
        expect(createAdmin["updatedAt"]).toBeTruthy()
        expect(createAdmin["nome"]).toBeTruthy()
        expect(createAdmin["email"]).toBeTruthy()

        const readAdmin = await request(app.getHttpServer())
            .get(`/administrador/${createAdmin?.id}`)
            .then(res => res.body)
            .catch(e => console.error(e))
        console.log("READ", createAdmin)
        expect(readAdmin["id"]).toBeTruthy()

        const updateBody: UpdateManagerDto = { nome: "Fulano Atualizado", email }
        const updateAdmin = await request(app.getHttpServer())
            .patch(`/administrador/${createAdmin?.id}`)
            .send(updateBody)
            .then(res => res.body)
            .catch(e => console.error(e))
        console.log("UPDATE", updateAdmin)
        expect(createAdmin["nome"]).not.toBe(updateAdmin["nome"])

        const deleteAdmin = await request(app.getHttpServer())
            .delete(`/administrador/${createAdmin?.id}`)
            .then(res => res.body)
            .catch(e => console.error(e))
        console.log("DELETE", deleteAdmin)
        const tryToReadDeletedAdmin = await request(app.getHttpServer())
            .get(`/administrador/${createAdmin?.id}`)
            .then(res => res.body)
            .catch(() => null)
        expect(tryToReadDeletedAdmin["id"]).toBeFalsy()

    })
})