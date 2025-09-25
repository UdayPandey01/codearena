import { forwardRef, Module } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { PrismaModule } from 'src/core/database/prisma.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
    imports : [PrismaModule,
        forwardRef(() => KafkaModule),
    ],
  providers: [ProcessingService],
  exports: [ProcessingService], 
})
export class ProcessingModule {}