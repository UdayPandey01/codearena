import { Global, Module } from "@nestjs/common";
import { Kafka } from "kafkajs";
import { KafkaProducerService } from "./kafka-producer.service";

@Global()
@Module({
    providers : [
        {
            provide : 'KAFKA_CLIENT',
            useFactory : () => {
                return new Kafka ({
                    clientId : 'codearena-backend',
                    brokers : ['kafka:29092']
                })
            }
        },
        KafkaProducerService,
    ],
    exports: [KafkaProducerService],
})

export class KafkaModule {}