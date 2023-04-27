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
exports.EstacionamentoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EstacionamentoService = class EstacionamentoService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async create(createEstacionamentoDto) {
        const alreadyExists = await this.clientRepository.estacionamento.findFirst({
            where: { cnpj: createEstacionamentoDto.cnpj },
            include: {
                administradores: true,
            },
        });
        if (alreadyExists) {
            throw new common_1.BadRequestException(`O estacionamento ${createEstacionamentoDto.razao_social} já está cadastrado com o CNPJ: ${createEstacionamentoDto.cnpj}. Por favor, tente recuperar a senha!`);
        }
        const createEstacionamento = await this.clientRepository.estacionamento.create({
            data: createEstacionamentoDto,
        });
        if (!createEstacionamento) {
            throw new common_1.InternalServerErrorException(`Não foi possível criar o estacionamento.`);
        }
        return createEstacionamento;
    }
    async findOne(id) {
        const foundEstacionamento = await this.clientRepository.estacionamento.findUnique({
            where: { id: id },
            include: {
                administradores: true,
            },
        });
        if (!foundEstacionamento) {
            throw new common_1.InternalServerErrorException(`Não foi possível encontrar o estacionamento. id: ${id}`);
        }
        return foundEstacionamento;
    }
    async updateOne(id, updateEstacionamentoDto) {
        const updatedEstacionamento = await this.clientRepository.estacionamento.update({
            where: { id: id },
            data: updateEstacionamentoDto,
        });
        if (!updatedEstacionamento) {
            throw new common_1.InternalServerErrorException(`Não foi possível atualizar o estacionamento. id: ${id}`);
        }
        return updatedEstacionamento;
    }
    async removeOne(id) {
        const deletedEstacionamento = await this.clientRepository.estacionamento.delete({
            where: { id: id },
        });
        if (!deletedEstacionamento) {
            throw new common_1.InternalServerErrorException(`Não foi possível deletar o estacionamento. id: ${id}`);
        }
        return {
            id: id,
            message: `Estacionamento com o id: ${id} foi deletado com sucesso.`,
        };
    }
};
EstacionamentoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EstacionamentoService);
exports.EstacionamentoService = EstacionamentoService;
//# sourceMappingURL=estacionamento.service.js.map