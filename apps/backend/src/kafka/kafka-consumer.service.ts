import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Kafka } from "kafkajs";
import { PrismaService } from "src/core/database/prisma.service";

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
    private readonly logger = new Logger(KafkaConsumerService.name);

    constructor (
        @Inject('KAFKA_CLIENT') private readonly kafkaClient: Kafka,
        private readonly prisma: PrismaService
    ) {}

    async onModuleInit() {
        const consumer = this.kafkaClient.consumer({ groupId: 'backend-judged-group' })
        await consumer.connect();
        await consumer.subscribe({topic : 'submission-judged', fromBeginning: true});

        await consumer.run({
            eachMessage : async ({toopic, partition, message}) => {
                const result = JSON.parse(message.value.toString());
                const { submissionId, status } = result; 

                this.logger.log(`Received judged submission: ${submissionId}, Status: ${status}`);

                await this.prisma.submission.update({
                    where: { id: submissionId },
                    data: { status: status },
                });
            }
        })
    }
}