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
exports.EstacionamentoController = void 0;
const common_1 = require("@nestjs/common");
const estacionamento_service_1 = require("./estacionamento.service");
const create_estacionamento_dto_1 = require("./dto/create-estacionamento.dto");
const update_estacionamento_dto_1 = require("./dto/update-estacionamento.dto");
const swagger_1 = require("@nestjs/swagger");
let EstacionamentoController = class EstacionamentoController {
    constructor(estacionamentoService) {
        this.estacionamentoService = estacionamentoService;
    }
    async create(createEstacionamentoDto) {
        return await this.estacionamentoService.create(createEstacionamentoDto);
    }
    async findOne(id) {
        return await this.estacionamentoService.findOne(+id);
    }
    async find(id) {
        return await this.estacionamentoService.findEstacionamentosAdm(+id);
    }
    async update(id, updateEstacionamentoDto) {
        return await this.estacionamentoService.updateOne(+id, updateEstacionamentoDto);
    }
    async remove(id) {
        return await this.estacionamentoService.removeOne(+id);
    }
};
__decorate([
    (0, common_1.Post)('/criar'),
    (0, swagger_1.ApiBody)({
        description: 'Criar estacionamento ',
        type: create_estacionamento_dto_1.CreateEstacionamentoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Criar estacionamento',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estacionamento_dto_1.CreateEstacionamentoDto]),
    __metadata("design:returntype", Promise)
], EstacionamentoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/encontrar/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Recupera um estacionamento',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstacionamentoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Recupera um estacionamento',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstacionamentoController.prototype, "find", null);
__decorate([
    (0, common_1.Patch)('/atualizar/:id'),
    (0, swagger_1.ApiBody)({
        description: 'Atualiza estacionamento ',
        type: update_estacionamento_dto_1.UpdateEstacionamentoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Atualiza estacionamento',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_estacionamento_dto_1.UpdateEstacionamentoDto]),
    __metadata("design:returntype", Promise)
], EstacionamentoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/deletar/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Deleta estacionamento',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstacionamentoController.prototype, "remove", null);
EstacionamentoController = __decorate([
    (0, swagger_1.ApiTags)('Estacionamento'),
    (0, common_1.Controller)('estacionamento'),
    __metadata("design:paramtypes", [estacionamento_service_1.EstacionamentoService])
], EstacionamentoController);
exports.EstacionamentoController = EstacionamentoController;
//# sourceMappingURL=estacionamento.controller.js.map