import { Module } from '@nestjs/common';
import { ProblemService } from './problems.service';
import { ProblemController } from './problems.controller';
import { PrismaService } from '../core/database/prisma.service';

@Module({
  controllers: [ProblemController],
  providers: [ProblemService, PrismaService],
})
export class ProblemModule {}
