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
exports.UpdateVeiculoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_veiculo_dto_1 = require("./create-veiculo.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateVeiculoDto extends (0, mapped_types_1.PartialType)(create_veiculo_dto_1.CreateVeiculoDto) {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Placa do veículo',
        default: 'oab-xb33',
    }),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], UpdateVeiculoDto.prototype, "placa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: 'string',
        default: 'Fox Wolksvagem',
        description: 'Modelo do veículo',
    }),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateVeiculoDto.prototype, "modelo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        type: 'number',
        description: 'Id do Cliente',
        default: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateVeiculoDto.prototype, "id_cliente", void 0);
exports.UpdateVeiculoDto = UpdateVeiculoDto;
//# sourceMappingURL=update-veiculo.dto.js.map