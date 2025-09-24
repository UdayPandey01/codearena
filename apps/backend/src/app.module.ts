import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import { PrismaModule } from './core/database/prisma.module';
import { ProblemModule } from './problems/problems.module';
import { KafkaModule } from './kafka/kafka.module';
import { SubmissionModule } from './submissions/submissions.module';

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        ProblemModule,
        KafkaModule,
        SubmissionModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}