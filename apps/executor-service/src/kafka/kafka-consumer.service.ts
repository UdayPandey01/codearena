import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { ProcessingService } from '../processing/processing.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: Kafka,
    private readonly processingService: ProcessingService,
  ) {}

  async onModuleInit() {
    const consumer = this.kafkaClient.consumer({ groupId: 'executor-group' });
    await consumer.connect();
    await consumer.subscribe({
      topic: 'submission-created',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const submissionJob = JSON.parse(message.value.toString());
        console.log('Received new submission job:', submissionJob.submissionId);

        await this.processingService.processSubmission(submissionJob);
      },
    });
  }
}
