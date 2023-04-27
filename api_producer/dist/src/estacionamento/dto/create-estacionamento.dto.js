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
exports.CreateEstacionamentoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEstacionamentoDto {
}
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: 'decimal',
        minimum: 6,
        default: 12340,
    }),
    __metadata("design:type", Number)
], CreateEstacionamentoDto.prototype, "preco", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: 'number',
        default: 12,
    }),
    __metadata("design:type", Number)
], CreateEstacionamentoDto.prototype, "vagas_preferenciais", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: 'number',
        default: 24,
    }),
    __metadata("design:type", Number)
], CreateEstacionamentoDto.prototype, "vagas_gerais", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: 'string',
        default: 'JhoDoeSJW',
    }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateEstacionamentoDto.prototype, "razao_social", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(14),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: 'string',
        default: '12.232.423/0001-33',
    }),
    (0, class_validator_1.MaxLength)(14),
    __metadata("design:type", String)
], CreateEstacionamentoDto.prototype, "cnpj", void 0);
exports.CreateEstacionamentoDto = CreateEstacionamentoDto;
//# sourceMappingURL=create-estacionamento.dto.js.map