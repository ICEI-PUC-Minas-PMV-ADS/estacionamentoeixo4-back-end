"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaModule = void 0;
const common_1 = require("@nestjs/common");
const reserva_controller_1 = require("./reserva.controller");
const microservices_1 = require("@nestjs/microservices");
const kafkajs_1 = require("kafkajs");
const kafka_service_1 = require("./kafka.service");
let ReservaModule = class ReservaModule {
};
ReservaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'KAFKA_CONSUMER_RESERVA',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['host.docker.internal:9094'],
                        },
                        producer: {
                            createPartitioner: kafkajs_1.Partitioners.DefaultPartitioner,
                        },
                        consumer: {
                            groupId: 'reserva-consumer-group',
                        },
                    },
                },
            ]),
        ],
        controllers: [reserva_controller_1.ReservaController],
        providers: [kafka_service_1.KafkaService],
    })
], ReservaModule);
exports.ReservaModule = ReservaModule;
//# sourceMappingURL=reserva.module.js.map