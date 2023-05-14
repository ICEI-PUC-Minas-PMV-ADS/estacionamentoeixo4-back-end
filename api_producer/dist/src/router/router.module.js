"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const cliente_module_1 = require("../cliente/cliente.module");
const estacionamento_module_1 = require("../estacionamento/estacionamento.module");
const manager_module_1 = require("../manager/manager.module");
const prisma_module_1 = require("../prisma/prisma.module");
const reserva_module_1 = require("../reserva/reserva.module");
const veiculo_module_1 = require("../veiculo/veiculo.module");
const routes = [
    auth_module_1.AuthModule,
    cliente_module_1.ClienteModule,
    veiculo_module_1.VeiculoModule,
    prisma_module_1.PrismaModule,
    estacionamento_module_1.EstacionamentoModule,
    manager_module_1.ManagerModule,
    reserva_module_1.ReservaModule,
];
let RouterModule = class RouterModule {
};
RouterModule = __decorate([
    (0, common_1.Module)({
        imports: [...routes],
        exports: [...routes],
    })
], RouterModule);
exports.RouterModule = RouterModule;
//# sourceMappingURL=router.module.js.map