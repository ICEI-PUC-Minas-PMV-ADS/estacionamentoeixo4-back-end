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
exports.ReservaController = void 0;
const common_1 = require("@nestjs/common");
const create_reserva_dto_1 = require("./dto/create-reserva.dto");
const cancelar_reserva_dto_1 = require("./dto/cancelar-reserva.dto");
const swagger_1 = require("@nestjs/swagger");
const kafka_service_1 = require("./kafka.service");
let ReservaController = class ReservaController {
    constructor(kafkaService) {
        this.kafkaService = kafkaService;
    }
    async onModuleInit() {
    }
    async create(createReservaDto) {
        this.kafkaService.sendMessage('reservar_vaga', JSON.stringify({ data: createReservaDto, method: 'create' }));
        await this.kafkaService.consumer.on('message', (message) => {
            console.log('Kafka Message:', message);
        });
        await this.kafkaService.consumer.on('error', (error) => {
            console.error('Kafka Error:', error);
        });
    }
    async update(canceledReservaDto) {
        this.kafkaService.sendMessage('reservar_vaga', JSON.stringify({ data: canceledReservaDto, method: 'update' }));
        await this.kafkaService.consumer.on('message', (message) => {
            console.log('Kafka Message:', message);
        });
        await this.kafkaService.consumer.on('error', (error) => {
            console.error('Kafka Error:', error);
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Reserva criada com sucesso!',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiBody)({ type: [create_reserva_dto_1.CreateReservaDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reserva_dto_1.CreateReservaDto]),
    __metadata("design:returntype", Promise)
], ReservaController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reserva cancelada com sucesso!',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiBody)({ type: [cancelar_reserva_dto_1.CanceledReservaDto], description: 'Reserva cancelada' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cancelar_reserva_dto_1.CanceledReservaDto]),
    __metadata("design:returntype", Promise)
], ReservaController.prototype, "update", null);
ReservaController = __decorate([
    (0, swagger_1.ApiTags)('Reserva'),
    (0, common_1.Controller)('reserva'),
    __metadata("design:paramtypes", [kafka_service_1.KafkaService])
], ReservaController);
exports.ReservaController = ReservaController;
//# sourceMappingURL=reserva.controller.js.map