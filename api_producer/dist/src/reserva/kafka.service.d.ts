import { Consumer } from 'kafka-node';
export declare class KafkaService {
    private client;
    consumer: Consumer;
    private producer;
    constructor();
    sendMessage(topic: string, message: string): Promise<void>;
}
