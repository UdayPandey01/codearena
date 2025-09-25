import {forwardRef, Global, Module} from "@nestjs/common"
import { Kafka } from "kafkajs"
import { KafkaConsumerService } from './kafka-consumer.service';
import { KafkaProducerService } from './kafka-producer.service'; 
import { ProcessingModule } from "src/processing/processing.module";

@Global()
@Module({   
    imports : [forwardRef(() => ProcessingModule)],
    providers : [
        {
            provide : 'KAFKA_CLIENT',
            useFactory : () => {
                return new Kafka ({
                    clientId : 'codearena-backend',
                    brokers : ['kafka:29092']
                })
            },
        },
        KafkaConsumerService,
        KafkaProducerService,
    ],
    exports : [KafkaProducerService]
})

export class KafkaModule {}