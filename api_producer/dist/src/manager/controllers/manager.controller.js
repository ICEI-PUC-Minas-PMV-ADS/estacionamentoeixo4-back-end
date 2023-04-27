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
exports.ManagerController = void 0;
const common_1 = require("@nestjs/common");
const manager_service_1 = require("../services/manager.service");
const create_manager_dto_1 = require("../dto/create-manager.dto");
const update_manager_dto_1 = require("../dto/update-manager.dto");
const manager_mapper_1 = require("../mapper/manager.mapper");
const swagger_1 = require("@nestjs/swagger");
let ManagerController = class ManagerController {
    constructor(managerService, mapper) {
        this.managerService = managerService;
        this.mapper = mapper;
    }
    create(createManagerDto) {
        return this.managerService.create(this.mapper.mapCreateManagerDtoToCreateManagerModel(createManagerDto));
    }
    getAll() {
        return this.managerService.getAll();
    }
    findById(id) {
        return this.managerService.findById(+id);
    }
    update(id, updateManagerDto) {
        return this.managerService.update(+id, this.mapper.mapUpdateManagerDtoToUpdateManagerModel(updateManagerDto));
    }
    remove(id) {
        return this.managerService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ description: 'Criar administador', type: create_manager_dto_1.CreateManagerDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Administrador criado com sucesso!',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manager_dto_1.CreateManagerDto]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de administaradores!',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Recupera um administrador',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBody)({ description: 'Atualiza administador', type: update_manager_dto_1.UpdateManagerDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Atualiza  administrador',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_manager_dto_1.UpdateManagerDto]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Deleta  administrador',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "remove", null);
ManagerController = __decorate([
    (0, swagger_1.ApiTags)('Administrador'),
    (0, common_1.Controller)('manager'),
    __metadata("design:paramtypes", [manager_service_1.ManagerService,
        manager_mapper_1.ManagerMapper])
], ManagerController);
exports.ManagerController = ManagerController;
//# sourceMappingURL=manager.controller.js.map