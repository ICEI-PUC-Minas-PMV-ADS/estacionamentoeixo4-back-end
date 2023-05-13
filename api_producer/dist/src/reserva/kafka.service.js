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
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const kafka_node_1 = require("kafka-node");
let KafkaService = class KafkaService {
    constructor() {
        this.client = new kafka_node_1.KafkaClient({
            kafkaHost: 'host.docker.internal:9094',
        });
        this.producer = new kafka_node_1.Producer(this.client);
        this.producer.on('ready', () => {
            console.log('Kafka Producer is connected and ready.');
        });
        this.consumer = new kafka_node_1.Consumer(this.client, [{ topic: 'reservar_vaga.reply', partition: 0 }], {
            groupId: 'reserva-consumer-group-client',
            fromOffset: true,
        });
        this.consumer.on('message', async (message) => {
            console.log('Kafka Message:', message.value.toString());
        });
    }
    async sendMessage(topic, message) {
        const payloads = [
            {
                topic: topic,
                messages: [message],
                partition: 0,
            },
        ];
        this.producer.send(payloads, (error, data) => {
            console.log(data);
            if (error) {
                console.error('Kafka send message error:', error);
            }
            else {
                console.log('Kafka send message success:', Object.assign({}, data));
            }
        });
    }
};
KafkaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KafkaService);
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafka.service.js.map