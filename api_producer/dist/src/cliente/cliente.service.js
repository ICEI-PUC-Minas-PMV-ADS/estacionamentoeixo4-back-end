"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClienteService = class ClienteService {
    constructor(clientRepository, clienteCache) {
        this.clientRepository = clientRepository;
        this.clienteCache = clienteCache;
    }
    async create(createClienteDto) {
        const isExistEmail = await this.clientRepository.cliente.findFirst({
            where: { email: createClienteDto.email },
        });
        if (isExistEmail) {
            throw new common_1.BadRequestException(`O Email ${createClienteDto.email} já está cadastrado. Por favor, tente recupere a senha!`);
        }
        const clienteResult = await this.clientRepository.cliente.create({
            data: createClienteDto,
        });
        if (!clienteResult) {
            throw new common_1.InternalServerErrorException(`Não foi possível criar o cliente `);
        }
        return clienteResult;
    }
    async findAll() {
        const clientesResultDB = await this.clientRepository.cliente.findMany();
        if (!clientesResultDB)
            throw new common_1.NotFoundException('Não existe clientes!');
        return clientesResultDB;
    }
    async findOne(id) {
        const clienteResultDB = await this.clientRepository.cliente.findFirst({
            where: {
                id,
            },
        });
        if (!clienteResultDB)
            throw new common_1.NotFoundException('Cliente não existente!');
        return clienteResultDB;
    }
    async findEmail(email) {
        const clienteResultDB = await this.clientRepository.cliente.findUnique({
            where: {
                email,
            },
        });
        return clienteResultDB;
    }
    async update(id, updateClienteDto) {
        const clienteUpdateResult = this.clientRepository.cliente.update({
            where: {
                id,
            },
            data: updateClienteDto,
        });
        if (!clienteUpdateResult) {
            throw new common_1.InternalServerErrorException(`Não foi possível atualizar o cliente `);
        }
        return clienteUpdateResult;
    }
    async remove(id) {
        const clienteDeleteResult = this.clientRepository.cliente.delete({
            where: {
                id,
            },
        });
        if (!clienteDeleteResult) {
            throw new common_1.InternalServerErrorException(`Não foi possível remover o cliente `);
        }
        return clienteDeleteResult;
    }
};
ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], ClienteService);
exports.ClienteService = ClienteService;
//# sourceMappingURL=cliente.service.js.map