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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ManagerService = class ManagerService {
    constructor(managerRepository) {
        this.managerRepository = managerRepository;
    }
    async create(CreateManagerDto) {
        const { nome, email } = CreateManagerDto;
        const emailExists = await this.managerRepository.administrador.findFirst({
            where: { email },
        });
        if (emailExists) {
            throw new common_1.ConflictException(`Administrador com o email '${email}' já está em uso.`);
        }
        const administrador = await this.managerRepository.administrador.create({
            data: {
                nome,
                email,
            },
        });
        return administrador;
    }
    async getAll() {
        try {
            const managers = await this.managerRepository.administrador.findMany({
                include: {
                    estacionamentos: true,
                },
            });
            return managers;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Não foi possível buscar os administradores.', error);
        }
    }
    async findById(id) {
        const manager = await this.managerRepository.administrador.findUnique({
            where: { id },
            include: {
                estacionamentos: true,
            },
        });
        if (!manager) {
            throw new common_1.NotFoundException(`Administrador com ID ${id} não encontrado.`);
        }
        return manager;
    }
    async update(id, updateManagerDto) {
        const { nome, email } = updateManagerDto;
        const existingManager = await this.managerRepository.administrador.findUnique({
            where: { id },
        });
        if (!existingManager) {
            throw new common_1.NotFoundException(`Administrador com o ID '${id}' não encontrado.`);
        }
        const emailExists = await this.managerRepository.administrador.findFirst({
            where: { email },
        });
        if (emailExists) {
            throw new common_1.ConflictException(`Administrador com o email '${email}' já está em uso.`);
        }
        const updatedManager = await this.managerRepository.administrador.update({
            where: { id },
            data: {
                nome,
                email,
            },
        });
        return updatedManager;
    }
    async remove(id) {
        const existingManager = await this.managerRepository.administrador.findUnique({
            where: { id },
        });
        if (!existingManager) {
            throw new common_1.NotFoundException(`Administrador com o ID '${id}' não encontrado.`);
        }
        const deletedManager = await this.managerRepository.administrador.delete({
            where: { id },
        });
        return deletedManager;
    }
};
ManagerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ManagerService);
exports.ManagerService = ManagerService;
//# sourceMappingURL=manager.service.js.map