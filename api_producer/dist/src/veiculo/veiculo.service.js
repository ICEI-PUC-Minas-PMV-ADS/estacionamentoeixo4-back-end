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
exports.VeiculoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VeiculoService = class VeiculoService {
    constructor(veiculoRepository, veiculoCache) {
        this.veiculoRepository = veiculoRepository;
        this.veiculoCache = veiculoCache;
    }
    async create(createVeiculoDto) {
        const isExistVeiculo = await this.veiculoRepository.veiculo.findFirst({
            where: { placa: createVeiculoDto.placa },
        });
        if (isExistVeiculo) {
            throw new common_1.BadRequestException(`O Veíclo ${createVeiculoDto.placa} já está cadastrado`);
        }
        const veiculoResult = await this.veiculoRepository.veiculo.create({
            data: createVeiculoDto,
        });
        if (!veiculoResult) {
            throw new common_1.InternalServerErrorException(`Não foi possível criar o veículo `);
        }
        await this.veiculoCache.set(`user_crated_${veiculoResult.id}`, veiculoResult);
        return veiculoResult;
    }
    async findAll() {
        const veiculosResultDB = await this.veiculoRepository.veiculo.findMany();
        if (!veiculosResultDB)
            throw new common_1.NotFoundException('Não existe veículos!');
        await this.veiculoCache.del('veiculos_cache');
        await this.veiculoCache.set('veiculos_cache', veiculosResultDB);
        return veiculosResultDB;
    }
    async findOne(id) {
        const veiculosResultDB = await this.veiculoRepository.veiculo.findUnique({
            where: {
                id,
            },
        });
        return veiculosResultDB;
    }
    async update(id, updateVeiculoDto) {
        const veiculoUpdateResult = this.veiculoRepository.veiculo.update({
            where: {
                id,
            },
            data: updateVeiculoDto,
        });
        if (!veiculoUpdateResult) {
            throw new common_1.InternalServerErrorException(`Não foi possível atualizar o veículo `);
        }
        await this.veiculoCache.set(`user_crated_${veiculoUpdateResult.id}`, veiculoUpdateResult);
        return veiculoUpdateResult;
    }
    async remove(id) {
        const veiculoDeleteResult = this.veiculoRepository.veiculo.delete({
            where: {
                id,
            },
        });
        if (!veiculoDeleteResult) {
            throw new common_1.InternalServerErrorException(`Não foi possível remover o veículo `);
        }
        await this.veiculoCache.del('veiculos_cache');
        return veiculoDeleteResult;
    }
};
VeiculoService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], VeiculoService);
exports.VeiculoService = VeiculoService;
//# sourceMappingURL=veiculo.service.js.map