import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Kafka } from "kafkajs";
import { PrismaService } from "src/core/database/prisma.service";

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaConsumerService.name);

  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: Kafka,
    private readonly prisma: PrismaService
  ) {}

  async onModuleInit() {
    const consumer = this.kafkaClient.consumer({ groupId: 'backend-judged-group' });

    await consumer.connect();
    this.logger.log('Kafka consumer connected');

    await consumer.subscribe({ topic: 'submission-judged', fromBeginning: true });
    this.logger.log('Subscribed to topic: submission-judged');

    await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const value = message.value?.toString() || '';
    console.log('Kafka message received:', value);

    try {
      const result = JSON.parse(value);
      console.log('Parsed message:', result);

      const { submissionId, status } = result;

      // Log before updating DB
      console.log(`Updating submission ${submissionId} with status ${status}`);
      await this.prisma.submission.update({
        where: { id: submissionId },
        data: { status },
      });
      console.log(`Submission ${submissionId} updated successfully.`);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  },
});

  }
}
