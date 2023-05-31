import { Injectable } from '@nestjs/common';
import { KafkaClient, Consumer, Producer } from 'kafka-node';
import 'dotenv/config';
import { Message } from 'kafkajs';

@Injectable()
export class KafkaService {
  private client: KafkaClient;
  public consumer: Consumer;
  private producer: Producer;

  constructor() {
    this.client = new KafkaClient({
      kafkaHost: process.env.KAKFA_URL,
    });

    this.producer = new Producer(this.client);
    this.producer.on('ready', () => {
      console.log('Kafka Producer is connected and ready.');
    });

    this.consumer = new Consumer(
      this.client,
      [{ topic: 'reservar_vaga.reply', partition: 0 }],
      {
        groupId: 'reserva-consumer-group-client',
        fromOffset: true,
      },
    );

    this.consumer.on('message', async (message: Message) => {
      console.log('Kafka Message:', message.value.toString());
    });
  }

  async sendMessage(topic: string, message: string): Promise<void> {
    const payloads = [
      {
        topic: topic,
        messages: [message],

        partition: 0,
      },
    ];

    this.producer.send(payloads, (error, data) => {
      if (error) {
        console.error('Kafka send message error:', error);
      } else {
        console.log('Kafka send message success:', { ...data });
      }
    });
  }
}
